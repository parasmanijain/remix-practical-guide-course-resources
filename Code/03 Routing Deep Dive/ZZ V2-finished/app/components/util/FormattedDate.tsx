function FormattedDate({ date }: { date: string | Date }) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return <time dateTime={new Date(date).toISOString()}>{formattedDate}</time>;
}

export default FormattedDate;
