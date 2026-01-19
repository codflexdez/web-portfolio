import { mailOptions, transporter } from "@lib/nodemailer";
import { NextResponse } from "next/server";
import fs from "fs";

// Prevent static optimization to avoid prerender issues
export const dynamic = 'force-dynamic';

const generateEmailContent = (data) => {
  const contact_msg_fields = {
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
  };

  const strData = Object.entries(data).reduce(
    (str, [key, val]) => (str += `${contact_msg_fields[key]}: \n${val} \n \n`),
    ""
  );
  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    return (str += `<h1>${contact_msg_fields[key]}</h1><p>${val}</p>`);
  }, "");

  const path = require("path");

  const templatePath = path.join(
    process.cwd(),
    "templates/email_template.html"
  );

  const htmlTemplate = fs.readFileSync(templatePath, "utf-8");

  // Replace the placeholder with the actual data
  const replacedHtml = htmlTemplate.replace("htmlData", htmlData);

  return {
    text: strData,
    html: replacedHtml,
  };
};

const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;

export async function POST(req) {
  if (req.method === "POST") {
    const data = await req.json();
    const { name, email, subject, message } = data;

    if (!name || !subject || !message || !emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Please enter valid information" },
        { status: 400 }
      );
    }

    try {
      await transporter.sendMail({
        ...mailOptions,
        ...generateEmailContent(data),
        subject: data.subject,
        cc: email,
      });
      return NextResponse.json({ success: true });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
  return NextResponse.json({ message: "Bad request" }, { status: 400 });
}
