INSERT INTO public.event_status (event_status_id, description)
VALUES (1, 'Awaiting approval'),
       (2, 'Approved'),
       (3, 'Denied'),
       (4, 'Mandatory'),
       (5, 'Taken')
ON CONFLICT (event_status_id)
  DO NOTHING;