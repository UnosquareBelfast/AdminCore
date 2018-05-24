INSERT INTO public.employee (
  employee_id, country_id, email, employee_role_id, employee_status_id, forename, password, start_date, surname, total_holidays)
        --decrypted password for super = un05qu@r3_@dm1n
VALUES (1, 1, 'superuser@unosquare.com', 2, 1, 'super', '$2a$10$v3qpm5f2Y45AeUbV2Wjiz.hMrUNVpmKcYuXJrRXHouOTNkTB26B9q',
        '2018-01-01', 'USER', 33),
        --decrypted password for user = password1
       (2, 1, 'user@unosquare.com', 3, 1, 'user', '$2a$10$rxHpvBppB.OMwgCiGroLSO7pU9SioGp4gCSUt5lBIG303WGsefZDe',
        '2018-01-01', 'USER', 33)
ON CONFLICT (employee_id)
  DO NOTHING;