import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";

export default function LandingPage() {
  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-slate-100 to-white px-4 min-h-screen">
      <Card className="shadow-xl w-full max-w-md">
        <CardContent className="space-y-6 p-6 text-center">
          <h1 className="font-bold text-3xl">Welcome to TodoApp</h1>
          <p className="text-gray-500">
            Stay productive. Organize your tasks. Never forget a thing.
          </p>

          <Separator />

          <div className="flex flex-col gap-4">
            <Button asChild>
              <Link to="/login">Log In</Link>
            </Button>

            <Button asChild variant="outline">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
