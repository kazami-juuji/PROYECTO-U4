<?php
    require_once '../config/conexion.php';
    class Productos extends Conexion{
        public function obtener_datos(){
            $consulta = $this->obtener_conexion()->prepare("SELECT * FROM t_producto");
            $consulta->execute();
            $datos = $consulta->fetchAll(PDO::FETCH_ASSOC);
            $this->cerrar_conexion();
            echo json_encode($datos);
        }

        public function insertar_datos(){
            if ($_POST) {
                if (isset($_POST['producto']) && !empty($_POST['producto']) && isset($_POST['precio']) && !empty($_POST['precio']) && isset($_POST['unidades']) && !empty($_POST['unidades'])) {
                    if (is_numeric($_POST['producto']) || !is_numeric($_POST['precio']) || !is_numeric($_POST['unidades'])) {
                        echo json_encode([0, "No puedes agregar números en el campo de producto o letras en precio o unidades "]);
                    } else {
                        $producto = $_POST['producto'];	
                        $precio = $_POST['precio'];	
                        $unidades = $_POST['unidades'];
                        $insercion = $this->obtener_conexion()->prepare("INSERT INTO t_producto(producto, precio, unidades) VALUES(:producto, :precio, :unidades)");
                        $insercion->bindParam(':producto',$producto);
                        $insercion->bindParam(':precio',$precio);
                        $insercion->bindParam(':unidades',$unidades);
                        $insercion->execute();
                        if($insercion){
                            echo json_encode([1,"Insercion correcta"]);
                        }else{
                            echo json_encode([0,"insercion no realizada"]);
                        }
                    }
                } else {
                    echo json_encode([0, "No puedes dejar campos vacíos"]);
                }
            }
        }

        public function actualizar_datos(){
            if ($_POST) {
                if (isset($_POST['producto']) && !empty($_POST['producto']) && isset($_POST['precio']) && !empty($_POST['precio']) && isset($_POST['unidades']) && !empty($_POST['unidades'])) {
                    if (is_numeric($_POST['producto']) || !is_numeric($_POST['precio']) || !is_numeric($_POST['unidades'])) {
                        echo json_encode([0, "No puedes agregar números en el campo de producto o letras en precio o unidades "]);
                    } else {
                        $producto = $_POST['producto'];	
                        $precio = $_POST['precio'];	
                        $unidades = $_POST['unidades'];
                        $id_producto = $_POST['id_producto'];
                        $actualizacion = $this->obtener_conexion()->prepare("UPDATE t_producto SET producto = :producto, precio = :precio, unidades = :unidades WHERE id_producto = :id_producto");
                        $actualizacion->bindParam(':producto',$producto);
                        $actualizacion->bindParam(':precio',$precio);
                        $actualizacion->bindParam(':unidades',$unidades);
                        $actualizacion->bindParam(':id_producto',$id_producto);
                        if($actualizacion->execute()){
                            echo json_encode([1,"Actualizacion correcta",$id_producto]);
                        }else{
                            echo json_encode([0,"Actualizacion no realizada"]);
                        }
                    }
                } else {
                    echo json_encode([0, "No puedes dejar campos vacíos"]);
                }
            }
        }

        public function eliminar_datos(){
            $eliminar = $this->obtener_conexion()->prepare("DELETE FROM t_producto WHERE id_producto = :id_producto");
            $id_producto = $_POST['id_producto'];
            $eliminar->bindParam(':id_producto',$id_producto);
            $eliminar->execute();
            if($eliminar){
                echo json_encode([1,"Eliminacion correcta"]);
            }else{
                echo json_encode([0,"Eliminacion no realizada"]);
            }
        }

        public function precargar_datos(){
            $consulta = $this->obtener_conexion()->prepare("SELECT * FROM t_producto WHERE id_producto = :id_producto");
            $id_producto = $_POST['id_producto'];
            $consulta->bindParam("id_producto",$id_producto);
            $consulta->execute();
            $datos = $consulta->fetch(PDO::FETCH_ASSOC);
            echo json_encode($datos);
        }
    }

    $consulta = new Productos();
    $metodo = $_POST['metodo'];
    $consulta->$metodo();
    
?>