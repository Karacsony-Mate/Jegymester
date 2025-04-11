use [JegymesterDb]

insert into [Users](Id, Name, Email, PhoneNumber, Password)
values
    (1, 'Wéninger Zalán Tibor', 'weningerzalan@jmester.hu', '06301234567', 'Zalan1234'),
    (2, 'Szász Áron', 'szaszaron@jmester.hu', '06302345678', 'Aron1234'),
    (3, 'Újhelyi Gergő Csaba', 'ujhelyigergo@jmester.hu', '06303456789', 'Gergo1234'),
    (4, 'Karácsony Máté', 'karacsonymate@jmester.hu', '06304567891', 'Mate1234')

insert into [Roles](Id, Name)
values
    (1, 'Customer'),
    (2, 'Cashier'),
    (3, 'Admin')

insert into [RoleUser](RolesId, UsersId)
values
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 1)

insert into [Movies](Id, Title, Description, Duration, Genre)
values
    (1, 'A keresztapa', '1972', '175', 'Krimi/Maffiafilm'),
    (2, 'A remény rabjai', '1994', '142', 'Dráma'),
    (3, 'A sötét lovag', '2008', '152', 'Akció/Dráma')

insert into [Screenings](Id, MovieId, DateTime, Location, AvaliableSeats)
values
    (1, 1, '2025-04-12 20:00:00.0000000', '1. terem', 49),
    (2, 2, '2025-04-13 20:00:00.0000000', '1. terem', 49),
    (3, 1, '2025-04-14 20:00:00.0000000', '2. terem', 69)

insert into [Tickets](Id, ScreeningId, UserId, Price, PurchaseDate, IsConfirmed)
values
    (1, 1, 1, 1500, '2025-04-06 23:00:00.0000000', 0),
    (2, 2, 4, 2000, '2025-04-07 10:00:00.0000000', 0),
    (3, 3, 1, 2500, '2025-04-14 17:00:00.0000000', 0)