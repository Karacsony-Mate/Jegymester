namespace Jegymester.DataContext.Entities
{
    public class Movie
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int Duration { get; set; }
        public string? Genre { get; set; }
    }
}
