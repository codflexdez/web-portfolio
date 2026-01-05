import classes from "@styles/loader.module.css";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className={classes.loader_box}>
      <div className={classes.loader}></div>
      <span>Signing in...</span>
    </div>
  );
}
