const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex justify-center items-center min-h-screen">
      {children}
    </div>
  );
};

export default Layout;
