const Headings = ({heading, subHeading}) => {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-4xl font-bold">{heading}</h2>
        <p className="text-lg">
          {subHeading}
        </p>
      </div>
    </div>
  );
};

export default Headings;
