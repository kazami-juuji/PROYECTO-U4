<div class="container mt-5">
        <div class="row justify-content-center bg-card">
            <div class="row justify-content-center">
                <ul class="menu-tooltip" class="gm-toolbar-nav">
                    <div class="col-20 text-center mt-2">
                        <?php if (isset($_SESSION['usuario']) && !empty($_SESSION['usuario'])) : ?>
                            <i class="bi bi-emoji-sunglasses"></i>
                            <h2 style="color: red;">Bienvenido <?= $_SESSION['usuario']['nombre'];?></h2>
                        <?php endif ?>
                        <?php if(isset($_SESSION['usuario'])) : ?>
                            <a href="editar_usuario" class="btn btn-warning mt-3 w-10 m-5" id="btn_editar">Editar Usuario</a>
                        <?php endif ?>
                            <a href="inicio" class="btn btn-primary mt-3 w-10 m-5">Inicio</a>
                            <a href="inventario" class="btn btn-success mt-3 w-10 w-10 m-5" id="btn_inventario">Inventario</a>
                        <?php if(isset($_SESSION['usuario'])) : ?>
                            <button type="button" class="btn btn-danger mt-3 w-10 m-5" id="btn_cerrar">Cerrar sesion</button>
                        <?php endif ?>
                    </div>
                </ul>
            </div>
            
        </div>
</div>