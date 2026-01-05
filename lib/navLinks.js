import logo from '@public/assets/icons/rp-logo.svg';

const links = [
    {
      to: "/#",
      name: "Gallery",
      id: "0",
      submenu: [
        { to: "/weddings", name: "Weddings" },
        { to: "/family", name: "Family" },
        { to: "/editorial", name: "Editorial" },
      ],
    },
    {
      to: "/proofing",
      name: "Proofing Gallery",
      id: "1",
    },
    {
      to: "/",
      img: logo.src,
      alt: "rp-logo",
      name: "",
      id: "2",
    },
    {
      to: "/about",
      name: "About",
      id: "3",
    },
    {
      to: "/contact",
      name: "Contact",
      id: "4",
    },
  ];

  export default links; 

