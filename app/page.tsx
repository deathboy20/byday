import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Categories from "@/components/categories"
import JobFeed from "@/components/job-feed"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Categories />
        <JobFeed />
      </main>
      <Footer />
    </div>
  )
}
