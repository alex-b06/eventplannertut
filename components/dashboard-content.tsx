import Link from "next/link";
import { Button } from "./ui/button";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export async function DashboardContent({userId} : {userId: string}) {

    const rows = await prisma.event.findMany({
        where: {ownerUserId: userId },
        orderBy: {createdAt: "desc"},
        select: {
            id: true,
            title: true,
            eventDate: true,
            location: true,
            // rsvps: {select: {status: true}},
        },
    });

    const events = rows.map((e) => ({
        id: e.id,
        title: e.title,
        eventDate: e.eventDate ? e.eventDate.toISOString() : null,
        location: e.location,
    }));

    return <div className="flex flex-1 flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Your Events</h1>
                <p className="text-sm text-[var(--muted-foreground)]">Track attendee responses and manage invite links.</p>
            </div>

            <Button asChild>
                <Link href={"/events/new"}>Create Event</Link>
            </Button>
        </div>
        {/* list of events */}

        {events.length ===0 ? (
            <Card>
             <CardHeader>
                  <CardTitle>No events yet</CardTitle>
             </CardHeader>
             <CardContent>
                 <p className="text-sm text-[var(--muted-foreground)]">
                     Create your first event to start collecting RSVPs.
                  </p>
               </CardContent>
          </Card> 
        ) : (
             <div className="flex flex-col gap-3">
                {events.map((event) => (
                    <Card key={event.id}>
                        <CardHeader className="gap-3 px-5 py-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <CardTitle>{event.title}</CardTitle>
                                <Button asChild>
                                    <Link href={`/events/${event.id}`}>Open</Link>
                                </Button>
                            </div>
                            <div className="flex gap-2">
                                <Badge variant="secondary"/>
                                <Badge variant="secondary"/>
                                <Badge variant="secondary"/>
                            </div>
                            <p className="text-sm text-[var(--muted-foreground)]">
                                {event.eventDate
                                    ? new Date(event.eventDate).toLocaleString()
                                    : "No date selected"}

                                {event.location ? ` - ${event.location}` : ""}
                            </p>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        )}
    </div>
};