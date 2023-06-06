const Header = ({ title, content }) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl">{title}</h2>
        <p className="w-1/2">{content}</p>
      </div>
    </>
  );
};

export default Header;
