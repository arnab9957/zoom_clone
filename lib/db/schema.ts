// lib/db/schema.ts
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const meetingNotes = pgTable("meeting_notes", {
  id: serial("id").primaryKey(),
  meetingId: text("meeting_id").notNull(), // Links to Stream meeting ID
  authorId: text("author_id").notNull(),   // Links to Clerk user ID
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
