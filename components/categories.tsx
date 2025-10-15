import { Paintbrush, Wrench, Sparkles, Hammer, Zap, Scissors } from "lucide-react"

const Categories = () => {
  const categories = [
    { name: "Painting", icon: Paintbrush, count: 234, color: "text-blue-600" },
    { name: "Plumbing", icon: Wrench, count: 189, color: "text-red-600" },
    { name: "Cleaning", icon: Sparkles, count: 312, color: "text-purple-600" },
    { name: "Carpentry", icon: Hammer, count: 156, color: "text-orange-600" },
    { name: "Electrical", icon: Zap, count: 198, color: "text-yellow-600" },
    { name: "Other", icon: Scissors, count: 267, color: "text-green-600" },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Browse by Category</h2>
          <p className="text-muted-foreground text-lg">Find the right worker for your needs</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <div
                key={category.name}
                className="bg-card rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group border border-border"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className={`h-8 w-8 ${category.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} jobs</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Categories
