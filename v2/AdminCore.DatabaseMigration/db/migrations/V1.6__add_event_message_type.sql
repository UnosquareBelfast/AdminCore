INSERT INTO public.event_message_type (event_message_type_id, description)
VALUES (1, 'General'),
       (2, 'Rejected'),
       (3, 'Cancelled')
ON CONFLICT (event_message_type_id)
  DO NOTHING;