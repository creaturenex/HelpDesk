import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button"

export default function Home(){
  return (
    <Card className="container max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Welcome to Our Help Desk</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-center text-muted-foreground">What would you like to do today?</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="flex-1">
            <Link to="/ticket/new">Submit a Ticket</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link to="/login">Log in as Admin</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}