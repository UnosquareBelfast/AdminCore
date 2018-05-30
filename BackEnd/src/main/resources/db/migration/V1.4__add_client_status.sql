INSERT INTO public.client_status (client_status_id, description)
VALUES (1, 'Active'),
       (2, 'Inactive')
ON CONFLICT (client_status_id)
  DO NOTHING;