namespace Jegymester.DataContext.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Password { get; set; }
        public List<Role> Roles { get; set; } = new List<Role>();
        public List<Ticket> Tickets { get; set; } = new List<Ticket>();
    }
}
