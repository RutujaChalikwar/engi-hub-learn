
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  enrolledCount: number;
  imageUrl: string;
  category: string;
}

interface CourseCardProps {
  course: Course;
  enrolled?: boolean;
  onEnroll?: (courseId: string) => void;
  progress?: number;
}

const CourseCard = ({ course, enrolled = false, onEnroll, progress }: CourseCardProps) => {
  const handleEnroll = () => {
    if (onEnroll) {
      onEnroll(course.id);
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={course.imageUrl || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"}
          alt={course.title}
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline">{course.level}</Badge>
          <Badge variant="secondary">{course.category}</Badge>
        </div>
        <CardTitle className="line-clamp-2 mt-2">{course.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">By {course.instructor}</span>
          <span className="mx-1">•</span>
          <span>{course.duration}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {course.description}
        </p>
        {progress !== undefined && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-edu-secondary h-1.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {enrolled ? (
          <Button asChild className="w-full">
            <Link to={`/courses/${course.id}`}>Continue Learning</Link>
          </Button>
        ) : (
          <Button onClick={handleEnroll} className="w-full">
            Enroll Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
