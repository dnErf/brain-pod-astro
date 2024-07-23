create table if not exists "public"."podcast" (
    "id" uuid default gen_random_uuid(),
    "user_id" uuid not null,
    "title" text not null,
    "description" text,
    "audio_id" uuid,
    "audio_url" text,
    "audio_voice" text,
    "audio_prompt" text,
    "image_id" uuid,
    "image_url" text,
    "image_prompt" text,
    "views" numeric,
    "dated_at" timestamp with time zone default timezone('utc'::text, now()) not null,
    PRIMARY KEY (id)
);
