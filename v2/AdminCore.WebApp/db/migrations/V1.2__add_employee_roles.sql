INSERT INTO public.employee_role (employee_role_id, description)
VALUES (1, 'Team leader'),
       (2, 'System administrator'),
       (3, 'User')
ON CONFLICT (employee_role_id)
  DO NOTHING;