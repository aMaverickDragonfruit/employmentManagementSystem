export default function PageLayout({ children }) {
  return (
    <div className='relative px-12 max-sm:pt-32 md:pt-20 lg:pt-10 w-full'>
      {children}
    </div>
  );
}
