INSERT INTO public.event_type (event_type_id, description)
VALUES (1, 'Annual Leave'),
       (2, 'Working From Home'),
       (3, 'Sick Leave'),
       (4, 'Work Related Travel')
ON CONFLICT (event_type_id)
  DO NOTHING;