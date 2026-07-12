import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import type {RsvpStatus as PrismaRsvpStatus } from "@/app/generated/prisma/enums";
import { notFound } from "next/navigation";
import Form from "next/form";
import { submitRsvpForToken } from "@/lib/actions/events";


export async function InviteRsvpContent({token, submitted} : {token: string; submitted: boolean;}) {

    const row = await prisma.eventInvite.findFirst({
        where: {token},
        include: {
            event: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    location: true,
                    eventDate: true,
                }
            }
        }
    });

    if (!row) {
        notFound();
    }

    const e = row.event;
    const event = {
        title: e.title,
        description: e.description,
        location: e.location,
        eventDate: e.eventDate ? e.eventDate.toISOString() : null,
    };



    return (
    <div className="mx-auto w-full max-w-2xl">
        <Card>
            <CardHeader className="space-y-3">
                <Badge variant="secondary" className="w-fit">
                    RSVP
                </Badge>
                <CardTitle>{event.title}</CardTitle>
                <p className="text-sm text-[var(--muted-foreground)]">
                    {event.eventDate
                    ? new Date(event.eventDate).toLocaleString()
                    : "No date selected"}
                    {event.location ? ` - ${event.location}` : ""}
                </p>
                {event.description ? (
                    <p className="text-sm text-[var(--muted-foreground)]">
                        {event.description}
                    </p>
                    ) : null}
            </CardHeader>
            <CardContent>
                {submitted ? (
                    <p className="mb-4 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15">
                        Thanks. Your RSVP has been recorded (or updated).
                    </p>
                ) : null}
                <Form action={submitRsvpForToken.bind(null, token)}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input id="name" name="name" required placeholder="Your name" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="you@example.com"
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="status">Attendance</FieldLabel>
                            <select
                                id="status"
                                name="status"
                                required
                                defaultValue="going"
                                className="flex h-10 w-full rounded-md border border-[var(--border)] bg-transparent px-3 text-sm"
                            >
                                <option value="going">Going</option>
                                <option value="maybe">Maybe</option>
                                <option value="not_going">Not going</option>
                            </select>
                        </Field>
                        <Button type="submit">Submit RSVP</Button>
                    </FieldGroup>
                </Form>
            </CardContent>
        </Card>
    </div>
    );
}