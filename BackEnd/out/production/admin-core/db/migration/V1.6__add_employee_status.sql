INSERT INTO public.employee_status (employee_status_id, description)
VALUES (1, 'Active'),
       (2, 'Inactive')
ON CONFLICT (employee_status_id)
  DO NOTHING;