
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import CourseCard from "@/components/courses/CourseCard";

// Featured courses
const featuredCourses = [
  {
    id: "course1",
    title: "Introduction to Electrical Engineering",
    description: "Learn the basics of electrical engineering, including circuits, power systems, and electronics.",
    instructor: "Dr. Emily Johnson",
    level: "Beginner",
    duration: "10 weeks",
    enrolledCount: 1250,
    imageUrl: "https://images.unsplash.com/photo-1581092921461-eab10380699b",
    category: "Electrical Engineering"
  },
  {
    id: "course2",
    title: "Machine Learning for Engineers",
    description: "Apply machine learning techniques to solve engineering problems with practical applications.",
    instructor: "Prof. Michael Chen",
    level: "Intermediate",
    duration: "8 weeks",
    enrolledCount: 850,
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Computer Science"
  },
  {
    id: "course3",
    title: "Structural Analysis for Civil Engineers",
    description: "Master the principles of structural analysis for buildings, bridges, and infrastructure.",
    instructor: "Dr. Sarah Williams",
    level: "Advanced",
    duration: "12 weeks",
    enrolledCount: 620,
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "Civil Engineering"
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-edu-primary to-edu-secondary text-white py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Advance Your Engineering Career
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Learn from industry experts and gain practical skills with our specialized engineering courses.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-white text-edu-primary hover:bg-gray-100" asChild>
                <Link to="/courses">Explore Courses</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/sign-up">Join Now</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22731c9c7c"
              alt="Engineering students"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-edu-primary mb-4">Why Choose EduEngineer?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers a unique learning experience tailored specifically for engineering students and professionals.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4 text-edu-secondary">👨‍🏫</div>
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from industry professionals and academic experts with years of experience.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4 text-edu-secondary">📊</div>
              <h3 className="text-xl font-semibold mb-2">Hands-on Projects</h3>
              <p className="text-gray-600">
                Apply your knowledge through practical projects and real-world case studies.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4 text-edu-secondary">🎓</div>
              <h3 className="text-xl font-semibold mb-2">Industry-Relevant</h3>
              <p className="text-gray-600">
                Curriculum designed to meet current industry standards and emerging technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-edu-primary mb-4">Featured Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start your learning journey with these popular engineering courses.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/courses">View All Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-edu-primary mb-4">What Our Students Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from engineering students and professionals who have transformed their careers through our platform.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                "The electrical engineering course was incredibly comprehensive. I gained practical knowledge I could apply immediately in my job. The instructor was knowledgeable and supportive throughout."
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-edu-primary/20 rounded-full flex items-center justify-center text-edu-primary font-bold">
                    JD
                  </div>
                </div>
                <div>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm text-gray-500">Electrical Engineer, XYZ Company</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                "The machine learning course helped me transition from traditional engineering to a data science role. The projects were challenging and the community support was invaluable."
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-edu-secondary/20 rounded-full flex items-center justify-center text-edu-secondary font-bold">
                    MS
                  </div>
                </div>
                <div>
                  <p className="font-semibold">Maria Smith</p>
                  <p className="text-sm text-gray-500">Data Scientist, ABC Tech</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-edu-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Advance Your Engineering Skills?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of engineering students and professionals who are transforming their careers through our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="bg-white text-edu-primary hover:bg-gray-100" asChild>
              <Link to="/courses">Explore Courses</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/sign-up">Sign Up for Free</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">EduEngineer</h3>
              <p className="text-gray-400">
                Empowering engineers with expert knowledge and practical skills for the modern workplace.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/courses" className="text-gray-400 hover:text-white">Courses</Link></li>
                <li><Link to="/sign-in" className="text-gray-400 hover:text-white">Sign In</Link></li>
                <li><Link to="/sign-up" className="text-gray-400 hover:text-white">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Course Categories</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Electrical Engineering</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Computer Science</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Civil Engineering</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Mechanical Engineering</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Email: support@eduengineer.com</li>
                <li className="text-gray-400">Phone: +1 (123) 456-7890</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} EduEngineer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
