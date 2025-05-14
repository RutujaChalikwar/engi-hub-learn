
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CourseGrid from "@/components/courses/CourseGrid";
import { Course } from "@/components/courses/CourseCard";

// Mock data for courses
const mockCourses: Course[] = [
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
  {
    id: "course4",
    title: "Thermodynamics and Heat Transfer",
    description: "Explore the fundamental principles of thermodynamics and heat transfer in engineering systems.",
    instructor: "Prof. David Rodriguez",
    level: "Intermediate",
    duration: "9 weeks",
    enrolledCount: 780,
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22731c9c7c",
    category: "Mechanical Engineering"
  },
  {
    id: "course5",
    title: "Digital Signal Processing",
    description: "Learn to analyze and manipulate signals in the digital domain with practical applications.",
    instructor: "Dr. Lisa Kim",
    level: "Advanced",
    duration: "10 weeks",
    enrolledCount: 540,
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Electrical Engineering"
  },
  {
    id: "course6",
    title: "Software Engineering Principles",
    description: "Master the fundamentals of software engineering, including design patterns, testing, and deployment.",
    instructor: "Prof. Alan Turing",
    level: "Beginner",
    duration: "8 weeks",
    enrolledCount: 1100,
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Computer Science"
  },
];

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [levelFilter, setLevelFilter] = useState<string>("");

  const filteredCourses = mockCourses.filter((course) => {
    // Apply search query filter
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply category filter
    const matchesCategory = categoryFilter === "" || course.category === categoryFilter;
    
    // Apply level filter
    const matchesLevel = levelFilter === "" || course.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const categories = Array.from(new Set(mockCourses.map(course => course.category)));
  const levels = ["Beginner", "Intermediate", "Advanced"];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-edu-primary mb-4">Our Courses</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our comprehensive range of engineering courses designed to help you advance your career and expand your knowledge.
        </p>
      </div>

      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-2">
            <Input
              placeholder="Search courses by name, description or instructor"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Levels</SelectItem>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-2 flex justify-end">
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setCategoryFilter("");
              setLevelFilter("");
            }}
            size="sm"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      <CourseGrid title={`All Courses (${filteredCourses.length})`} courses={filteredCourses} />
    </div>
  );
};

export default CoursesPage;
