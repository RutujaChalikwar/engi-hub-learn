
import { useAuth } from "@/contexts/AuthContext";
import CourseGrid, { Course } from "@/components/courses/CourseGrid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for enrolled courses
const enrolledCourses: Course[] = [
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
];

// Mock data for upcoming classes
const upcomingClasses = [
  {
    id: "class1",
    title: "Live Workshop: Circuit Design",
    courseTitle: "Introduction to Electrical Engineering",
    date: new Date(Date.now() + 86400000), // Tomorrow
    duration: "1 hour",
    instructor: "Dr. Emily Johnson",
    meetingLink: "https://meet.google.com/abc-defg-hij"
  },
  {
    id: "class2",
    title: "Q&A Session: Neural Networks",
    courseTitle: "Machine Learning for Engineers",
    date: new Date(Date.now() + 86400000 * 3), // 3 days from now
    duration: "45 minutes",
    instructor: "Prof. Michael Chen",
    meetingLink: "https://meet.google.com/xyz-abcd-efg"
  },
];

const UserDashboard = () => {
  const { currentUser } = useAuth();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome, {currentUser?.displayName || "Student"}!</h1>
        <p className="text-muted-foreground mt-2">
          Track your progress and continue learning.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">2</CardTitle>
            <CardDescription>Enrolled Courses</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">53%</CardTitle>
            <CardDescription>Average Progress</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">2</CardTitle>
            <CardDescription>Upcoming Classes</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Upcoming Classes</h2>
        {upcomingClasses.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {upcomingClasses.map((classItem) => (
              <Card key={classItem.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{classItem.title}</CardTitle>
                  <CardDescription>{classItem.courseTitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Instructor:</span>
                      <span>{classItem.instructor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date & Time:</span>
                      <span>{formatDate(classItem.date)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{classItem.duration}</span>
                    </div>
                    <div className="mt-4">
                      <a 
                        href={classItem.meetingLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-edu-secondary hover:underline block w-full text-center border border-edu-secondary rounded-md py-1 hover:bg-edu-secondary/10 transition-colors"
                      >
                        Join Meeting
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-6 text-center">
              <p>No upcoming classes scheduled.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <div>
        <CourseGrid 
          title="Your Courses" 
          courses={enrolledCourses} 
          enrolled={true}
          showProgress={true}
        />
      </div>
    </div>
  );
};

export default UserDashboard;
