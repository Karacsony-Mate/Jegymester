import { Card, Typography, Row, Col, Statistic, Button } from "antd";
import { IconTicket, IconMovie, IconActivity } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { getUserIdFromToken } from "../api/jwtUtils";

const Dashboard = () => {
  const navigate = useNavigate();
  const { token, role } = useContext(AuthContext);
  const [stats, setStats] = useState({ movies: 0, screenings: 0, myTickets: 0 });

  useEffect(() => {
    let userId = null;
    if (token) {
      userId = getUserIdFromToken(token);
    }
    Promise.all([
      api.Movies.getMovies().then(res => res.data.length),
      api.Screenings.getScreenings().then(res => res.data.length),
      (role !== 'Admin' && role !== 'Cashier' && userId) ? api.Tickets.getTicketsByUserId(userId).then(res => res.length) : Promise.resolve(0)
    ]).then(([movies, screenings, myTickets]) => setStats({ movies, screenings, myTickets }));
  }, [token, role]);

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto" }}>
      <Typography.Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
        Üdvözlünk a Jegymesteren!
      </Typography.Title>
      <Row gutter={32} justify="center" style={{ marginBottom: 32 }}>
        <Col span={8}>
          <Card hoverable onClick={() => navigate("/app/movies")}
                style={{ textAlign: "center", minHeight: 180 }}>
            <IconMovie size={48} color="#7c3aed" style={{ marginBottom: 12 }} />
            <Statistic title="Filmek" value={stats.movies} />
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable onClick={() => navigate("/app/screenings")}
                style={{ textAlign: "center", minHeight: 180 }}>
            <IconActivity size={48} color="#f59e42" style={{ marginBottom: 12 }} />
            <Statistic title="Vetítések" value={stats.screenings} />
          </Card>
        </Col>
        {role !== 'Admin' && role !== 'Cashier' && (
          <Col span={8}>
            <Card hoverable onClick={() => navigate("/app/my-tickets")}
                  style={{ textAlign: "center", minHeight: 180 }}>
              <IconTicket size={48} color="#22c55e" style={{ marginBottom: 12 }} />
              <Statistic title="Saját jegyek" value={stats.myTickets} />
            </Card>
          </Col>
        )}
      </Row>
      <Card style={{ textAlign: "center", background: "#f9f9f9" }}>
        <Typography.Title level={4} style={{ marginBottom: 16 }}>
          Jegymester – ahol a moziélmény kezdődik!
        </Typography.Title>
        <Typography.Paragraph style={{ fontSize: 18 }}>
          Vásárolj jegyet, böngéssz filmeket, vagy nézd meg a közelgő vetítéseket!<br />
          <span style={{ color: '#7c3aed', fontWeight: 500 }}>Kellemes szórakozást kívánunk!</span>
        </Typography.Paragraph>
        <Button type="primary" size="large" onClick={() => navigate("/app/screenings")}>Vetítések megtekintése</Button>
      </Card>
    </div>
  );
};

export default Dashboard;