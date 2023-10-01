import { db } from "../db.js";

export const register = (req, res) => {
    //CHECK USER
    let username = req.body.username;
    let password = req.body.password;
    let user_role = req.body.user_role;
    let dash_head1 = req.body.dash_head1;
    let dash_head2 = req.body.dash_head2;
    let dash_head3 = req.body.dash_head3;
    let site_head1 = req.body.site_head1;
    let site_head2 = req.body.site_head2;
    let site_head3 = req.body.site_head3;

    const q = "INSERT INTO users (username, password, user_role, dash_head1, dash_head2, dash_head3, site_head1, site_head2, site_head3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(q, [username, password, user_role, dash_head1, dash_head2, dash_head3, site_head1, site_head2, site_head3], (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        if(data.affectedRows > 0){
            res.status(200).send("User Registered Successfully");
        }
    });
};