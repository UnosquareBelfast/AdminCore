INSERT INTO public.country (country_id, description)
VALUES (1, 'Northern Ireland'),
       (2, 'Mexico')
ON CONFLICT (country_id)
  DO NOTHING;