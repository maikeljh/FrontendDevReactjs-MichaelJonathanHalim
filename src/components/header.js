const Header = ({ title, content }) => {
  return (
    <>
      <div className="flex flex-col gap-4 text-center lg:text-left">
        <h2 className="text-2xl sm:text-4xl">{title}</h2>
        <p className="lg:w-1/2">{content}</p>
      </div>
    </>
  );
};

export default Header;
