import { createEventAction } from "@/lib/actions/events"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function CreateEventForm() {
  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Create Event</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="create-event-form" action={createEventAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="create-event-title">Title</FieldLabel>
              <Input
                id="create-event-title"
                name="title"
                placeholder="Team dinner..."
                autoComplete="off"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="create-event-description">
                Description
              </FieldLabel>
              <Textarea
                id="create-event-description"
                name="description"
                placeholder="Optional details about the event"
                rows={4}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="create-event-location">
                Location
              </FieldLabel>
              <Input
                id="create-event-location"
                name="location"
                placeholder="Optional location"
                autoComplete="off"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="create-event-date">
                Date and time
              </FieldLabel>
              <Input
                id="create-event-date"
                name="eventDate"
                type="datetime-local"
              />
              <FieldDescription>
                Optional, you can set this later.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardContent className="flex gap-2 pt-0">
        <Button type="submit" form="create-event-form">
          Create event
        </Button>
        <Button type="reset" variant="outline" form="create-event-form">
          Cancel
        </Button>
      </CardContent>
    </Card>
  )
}
