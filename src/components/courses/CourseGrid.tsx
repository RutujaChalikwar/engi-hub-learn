
import CourseCard from "./CourseCard";
import { Course } from "./CourseCard";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface CourseGridProps {
  title: string;
  courses: Course[];
  enrolled?: boolean;
  showProgress?: boolean;
}

// Mock progress data - would come from Firestore in a real app
const mockProgressData: Record<string, number> = {
  "course1": 75,
  "course2": 30,
  "course3": 100,
  "course4": 50,
  "course5": 0,
};

const CourseGrid = ({ title, courses, enrolled = false, showProgress = false }: CourseGridProps) => {
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  const handleEnroll = (courseId: string) => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to enroll in courses.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would call a Firebase function to enroll the user
    setEnrolledCourses((prev) => [...prev, courseId]);
    toast({
      title: "Successfully Enrolled!",
      description: "You have been enrolled in the course.",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            enrolled={enrolled || enrolledCourses.includes(course.id)}
            onEnroll={handleEnroll}
            progress={showProgress ? mockProgressData[course.id] : undefined}
          />
        ))}
      </div>
      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No courses found.</p>
        </div>
      )}
    </div>
  );
};

export default CourseGrid;
