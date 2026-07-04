-- CreateEnum
CREATE TYPE "RsvpStatus" AS ENUM ('going', 'maybe', 'not_going');

-- CreateTable
CREATE TABLE "events" (
    "id" UUID NOT NULL,
    "owner_user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "event_date" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events_invites" (
    "id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_invites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events_rsvps" (
    "id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "invite_id" UUID,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_normalized" TEXT NOT NULL,
    "status" "RsvpStatus" NOT NULL,
    "responded_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_rsvps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_events_owner" ON "events"("owner_user_id", "created_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "events_invites_event_id_key" ON "events_invites"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "events_invites_token_key" ON "events_invites"("token");

-- CreateIndex
CREATE INDEX "idx_rsvps_event" ON "events_rsvps"("event_id", "responded_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "events_rsvps_event_id_email_normalized_key" ON "events_rsvps"("event_id", "email_normalized");

-- AddForeignKey
ALTER TABLE "events_invites" ADD CONSTRAINT "events_invites_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
