const UserModel =
    require('../models/User');

    const UserController = {

        async index(req, res) {
    
            try {
    
                const users =
                    await UserModel.getAllUsers();
    
                return res.json({
                    success: true,
                    data: users
                });
    
            } catch (error) {
    
                console.log(error);
    
                return res.status(500).json({
                    success: false,
                    message:
                        "Gagal mengambil data user"
                });
    
            }
    
        },
    
        async update(req, res) {
    
            try {
    
                await UserModel.update(
                    req.params.id,
                    req.body
                );
    
                return res.json({
                    success: true,
                    message:
                        "User berhasil diupdate"
                });
    
            } catch (error) {
    
                console.log(error);
    
                return res.status(500).json({
                    success: false,
                    message:
                        "Gagal update user"
                });
    
            }
    
        },
    
        async destroy(req, res) {
    
            try {
    
                await UserModel.delete(
                    req.params.id
                );
    
                return res.json({
                    success: true,
                    message:
                        "User berhasil dihapus"
                });
    
            } catch (error) {
    
                console.log(error);
    
                return res.status(500).json({
                    success: false,
                    message:
                        "Gagal menghapus user"
                });
    
            }
    
        },
    
        async parents(req, res) {
    
            try {
    
                const parents =
                    await UserModel.getParents();
    
                return res.json({
                    success: true,
                    data: parents
                });
    
            } catch (error) {
    
                console.log(error);
    
                return res.status(500).json({
                    success: false,
                    message:
                        "Gagal mengambil data parent"
                });
    
            }
    
        }
    
    };

module.exports =
    UserController;