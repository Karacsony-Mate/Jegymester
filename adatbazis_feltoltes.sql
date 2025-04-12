use [JegymesterDb]

insert into [Users](Name, Email, PhoneNumber, Password)
values
    ('Wéninger Zalán Tibor', 'weningerzalan@jmester.hu', '06301234567', 'Zalan1234'),
    ('Szász Áron', 'szaszaron@jmester.hu', '06302345678', 'Aron1234'),
    ('Újhelyi Gergő Csaba', 'ujhelyigergo@jmester.hu', '06303456789', 'Gergo1234'),
    ('Karácsony Máté', 'karacsonymate@jmester.hu', '06304567891', 'Mate1234')

insert into [Roles](Name)
values
    ('Customer'),
    ('Cashier'),
    ('Admin')

insert into [RoleUser](RolesId, UsersId)
values
    (1, 1),
    (2, 2),
    (3, 3),
    (1, 4)

insert into [Movies](Title, Description, Duration, Genre)
values
    ('A keresztapa', '1972', '175', 'Krimi/Maffiafilm'),
    ('A remény rabjai', '1994', '142', 'Dráma'),
    ('A sötét lovag', '2008', '152', 'Akció/Dráma')

insert into [Screenings](MovieId, DateTime, Location, AvaliableSeats)
values
    (1, '2025-04-12 20:00:00.0000000', '1. terem', 49),
    (2, '2025-04-13 20:00:00.0000000', '1. terem', 49),
    (1, '2025-04-14 20:00:00.0000000', '2. terem', 69)

insert into [Tickets](ScreeningId, UserId, Price, PurchaseDate, IsConfirmed)
values
    (1, 1, 1500, '2025-04-06 23:00:00.0000000', 0),
    (2, 4, 2000, '2025-04-07 10:00:00.0000000', 1),
    (3, 1, 2500, '2025-04-14 17:00:00.0000000', 0)
