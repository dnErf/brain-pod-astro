create table if not exists "public"."users" (
    id uuid references auth.users not null primary key,
    user_name text,
    full_name text,
    avatar_url text
);

create function "public".handle_new_user()
returns trigger as $$
begin
    insert into "public"."users" (id, user_name, full_name, avatar_url)
    values (new.id, '', '', '');
    return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
    after insert on "auth"."users"
    for each row execute procedure "public".handle_new_user();
