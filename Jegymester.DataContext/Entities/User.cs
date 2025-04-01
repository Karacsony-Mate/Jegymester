namespace Jegymester.DataContext.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
//      public string? Password { get; set; }
        public string? Phone { get; set; }
        public List<Role> Roles { get; set; }
        public List<Ticket> Tickets { get; set; }
    }
}
