import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import JobFeed from "@/components/JobFeed";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
        <Categories />
        <JobFeed />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
