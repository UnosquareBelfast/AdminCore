INSERT INTO public.contract_status (contract_status_id, description)
VALUES (1, 'Active'),
       (2, 'Inactive')
ON CONFLICT (contract_status_id)
  DO NOTHING;