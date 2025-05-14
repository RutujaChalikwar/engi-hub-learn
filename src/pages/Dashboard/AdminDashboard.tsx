
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Mock data for admin dashboard
const statsData = [
  {
    title: "Total Courses",
    value: "15",
    change: "+2 this month",
    trend: "up"
  },
  {
    title: "Total Users",
    value: "572",
    change: "+48 this month",
    trend: "up"
  },
  {
    title: "Course Completions",
    value: "128",
    change: "+12 this month",
    trend: "up"
  },
  {
    title: "Average Rating",
    value: "4.8/5",
    change: "+0.2 this month",
    trend: "up"
  }
];

const recentEnrollments = [
  {
    id: "enr1",
    user: "Alex Johnson",
    email: "alex@example.com",
    course: "Introduction to Electrical Engineering",
    date: "2023-05-12T14:30:00Z"
  },
  {
    id: "enr2",
    user: "Sofia Martinez",
    email: "sofia@example.com",
    course: "Machine Learning for Engineers",
    date: "2023-05-12T10:15:00Z"
  },
  {
    id: "enr3",
    user: "James Wilson",
    email: "james@example.com",
    course: "Advanced Circuit Design",
    date: "2023-05-11T16:45:00Z"
  }
];

const AdminDashboard = () => {
  const { currentUser } = useAuth();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {currentUser?.displayName || "Admin"}. Here's what's happening with your platform.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">{stat.value}</CardTitle>
              <CardDescription>
                {stat.title}
                <span 
                  className={`ml-2 ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.change}
                </span>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Enrollments</CardTitle>
            <CardDescription>Latest users who enrolled in courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEnrollments.map((enrollment) => (
                <div key={enrollment.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div>
                    <p className="font-medium">{enrollment.user}</p>
                    <p className="text-sm text-muted-foreground">{enrollment.email}</p>
                    <p className="text-sm">Enrolled in: <span className="font-medium">{enrollment.course}</span></p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(enrollment.date)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard/users">View All Users</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Button className="w-full" asChild>
                <Link to="/dashboard/manage-courses/new">Create New Course</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/dashboard/schedule/new">Schedule New Class</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/dashboard/users">Manage Users</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/dashboard/analytics">View Analytics</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>Classes scheduled for the next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-muted rounded-md">
              <div>
                <p className="font-medium">Live Workshop: Circuit Design</p>
                <p className="text-sm text-muted-foreground">Introduction to Electrical Engineering</p>
              </div>
              <div className="text-right">
                <p className="text-sm">Tomorrow at 2:30 PM</p>
                <p className="text-sm text-muted-foreground">12 attendees</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted rounded-md">
              <div>
                <p className="font-medium">Q&A Session: Neural Networks</p>
                <p className="text-sm text-muted-foreground">Machine Learning for Engineers</p>
              </div>
              <div className="text-right">
                <p className="text-sm">Friday at 11:00 AM</p>
                <p className="text-sm text-muted-foreground">8 attendees</p>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/schedule">View Full Schedule</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
