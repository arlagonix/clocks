import classes from "./index.module.css";

interface DateItemProps {
  value: string;
}

const DateItem = ({ value }: DateItemProps) => {
  return <p className={classes.highlight}>{value}</p>;
};

export default DateItem;
