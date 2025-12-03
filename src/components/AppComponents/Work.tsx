import { Search, Database, MousePointerClick } from "lucide-react";

const steps = [
  {
    icon: <Database className="w-10 h-10" />,
    title: "We Aggregate",
    desc: "Our system monitors every auction house across Australia, capturing new listings within 4 hours",
  },
  {
    icon: <Search className="w-10 h-10" />,
    title: "You Search",
    desc: "Use powerful filters to find exactly what you’re looking for across all auctions at once",
  },
  {
    icon: <MousePointerClick className="w-10 h-10" />,
    title: "Click & Bid",
    desc: "Go straight to the original auction house listing to register and place your bid",
  },
];

export default function Works() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        {/* Main Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16">
          How It Works
        </h2>

        {/* 3 Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-900">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Our Guarantee */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Our Guarantee
          </h3>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium italic">
            When you can confidently say: <br />
            <span className="text-indigo-900 font-bold not-italic">
              “If it’s being publicly auctioned in Australia and it’s a classic
              or collector car, it WILL appear here first and most accurately”
            </span>{" "}
            — that is our only success metric.
          </p>
        </div>
      </div>
    </section>
  );
}
