import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Case } from "@/types/case";

export default async function CasesPage() {
  const supabase = createServerComponentClient({ cookies });

  // Get the current user's session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  // Fetch cases for the logged-in user
  const { data: cases, error } = await supabase
    .from("cases")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching cases:", error);
    throw new Error("Failed to fetch cases");
  }

  return (
    <div className="max-w-6xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">My Cases</CardTitle>
        </CardHeader>
        <CardContent>
          {cases && cases.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(cases as Case[]).map((case_) => (
                  <TableRow key={case_.id}>
                    <TableCell className="font-medium">{case_.title}</TableCell>
                    <TableCell>{case_.type}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          case_.status === "Draft"
                            ? "secondary"
                            : case_.status === "Submitted"
                            ? "default"
                            : case_.status === "Resolved"
                            ? "success"
                            : "warning"
                        }
                      >
                        {case_.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span>{new Date(case_.created_at).toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <Link href={`/cases/${case_.id}`}>
                        <Button variant="outline" size="sm">
                          View More
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              No cases found. Create your first case to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
