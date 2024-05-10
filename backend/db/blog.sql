-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-05-2024 a las 21:42:40
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `blog`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `descrip` text NOT NULL,
  `img` varchar(200) NOT NULL,
  `date` datetime NOT NULL,
  `uid` int(11) NOT NULL,
  `cat` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id`, `title`, `descrip`, `img`, `date`, `uid`, `cat`) VALUES
(1, '¿Cuándo se estrena \'Deadpool 3\' en cines?', '<p>Marvel ha confirmado que el estreno de \'Deadpool 3\' en cines tendrá lugar el&nbsp;26 de julio de 2024. De la enorme reestructuración de lanzamiento de Disney como consecuencia de las huelgas de Hollywood, es la gran beneficiada -otros títulos como&nbsp;Avatar 3&nbsp;finalmente no podremos verlos hasta más tarde de lo previsto-, siendo además la única película del MCU que se estrenará ese año.</p><h3><br></h3><h2>La historia</h2><p><strong>La principal incógnita</strong>, ya que da la sensación de que a Disney le está costando encontrar un enfoque para la película que pueda mantener la orientación para un público adulto pero que también encaje dentro de este longevo y exitoso universo de superhéroes.</p><p>Lo único completamente seguro es que Reynolds volverá a dar vida a Wade Wilson y a su alter ego Deadpool.&nbsp;<strong>Fue el papel que relanzó su carrera</strong>&nbsp;cuando pasaba por un mal momento tras el enorme fracaso de&nbsp;<span style=\"color: rgb(33, 140, 121);\">\'Linterna verde\'</span>&nbsp;y actualmente es un actor muy solicitado, visto últimamente en títulos como&nbsp;<span style=\"color: rgb(33, 140, 121);\">\'Free Guy\'</span>,&nbsp;<span style=\"color: rgb(33, 140, 121);\">\'Alerta Roja\'</span>&nbsp;o \'El proyecto Adam\'.</p><p>Luego hay varios viejos conocidos de la saga que podrían reaparecer, estando confirmados los regresos&nbsp;<strong>Morena Baccarin</strong>&nbsp;como Vanessa, la prometida del protagonista,&nbsp;<strong>&nbsp;Stefan Kapicic</strong>&nbsp;como Coloso,&nbsp;<strong>Brianna Hildebrand&nbsp;</strong>como<strong>&nbsp;</strong>Cabeza Nuclear Adolescente Negasónica,&nbsp;<strong>Leslie Uggams</strong>&nbsp;y<strong>&nbsp;Rob Delaney</strong>. El resto está más en el aire, estando descartada la vuelta de&nbsp;<strong>T. J. Miller</strong>, y se mantienen las dudas de&nbsp;<strong>Zazie Beetz y</strong>&nbsp;<strong>Josh Brolin.</strong></p><p><span style=\"color: rgb(33, 140, 121);\">El regreso que nadie esperaba</span>&nbsp;pero que finalmente se ha confirmado es el de&nbsp;<strong>Hugh Jackman</strong>&nbsp;como Lobezno, personaje que parecía haber dejado atrás tras la sensacional&nbsp;<span style=\"color: rgb(33, 140, 121);\">\'Logan\'</span>. Además, entre las novedades sobresalen los fichajes de&nbsp;<strong>Emma Corrin y Matthew Macfadyen</strong>&nbsp;para dar vida a personajes por ahora desconocidos.</p><p>Además, hay fuertes rumores sobre la posible aparición de la cantante&nbsp;<strong>Taylor Swift</strong>, pero nada de eso se ha confirmado o desmentido por el momento. Lo que sí es seguro es que el personaje de Dientes de Sable, gran enemigo de Lobezno, hará acto de presencia en la película.</p>', 'cover-1715102235435.jpg', '2024-05-10 13:47:01', 1, 'cinema'),
(2, '15 datos curiosos de las películas más populares de Hollywood', '<p>El mundo del cine está lleno de historias fascinantes y detalles ocultos que hacen que las películas sean aún más especiales. Desde secretos ocultos en los escenarios hasta curiosidades sobre los actores, así que prepárate para descubrir estos datos de tus largometrajes favoritos.</p><p><br></p><p><u>‘Titanic’</u></p><p>Si hay una película que tiene que estar en esta lista, esa es<strong>&nbsp;‘Titanic’.&nbsp;</strong>Pues,<strong>&nbsp;</strong>el largometraje dirigido por&nbsp;<strong>James Cameron</strong>&nbsp;no solo es una de las cintas más galardonadas de la historia de&nbsp;<strong>Hollywood</strong>, sino que también posee más de un secreto.</p><p>Hay dos icónicas escenas en la película protagonizada por&nbsp;<strong>Leonardo DiCaprio y Kate Winslet</strong>. Una de ellas es el desnudo de&nbsp;<strong>Rose</strong>&nbsp;en el que&nbsp;<strong>Jack</strong>&nbsp;la dibuja y aunque hubiera sido genial que el actor lo hiciera en vivo, quien en verdad hizo el retrato fue el mismísimo director.</p><p><br></p><p><span style=\"color: rgb(31, 31, 31);\">Otra escena que siempre quedará grabada en nuestra memoria es cuando&nbsp;</span><strong style=\"color: rgb(31, 31, 31);\">Jack</strong><span style=\"color: rgb(31, 31, 31);\">&nbsp;le enseña a&nbsp;</span><strong style=\"color: rgb(31, 31, 31);\">Rose</strong><span style=\"color: rgb(31, 31, 31);\">&nbsp;cómo “volar” y se sube en la proa del barco, esto fue improvisado por los actores.&nbsp;</span><strong style=\"color: rgb(31, 31, 31);\">James Cameron</strong><span style=\"color: rgb(31, 31, 31);\">&nbsp;amó esta escena y aunque no estaba dentro del guion, decidió incluirla.</span></p><p><br></p><p><u>‘Candyman’</u></p><p>La cinta dirigida por&nbsp;<strong>Bernard Rose</strong>&nbsp;tiene escenas icónicas que no fueron realizadas con efectos especiales, sino que muchas de ellas fueron grabadas en tiempo real.</p><p>Las escenas más sorprendentes fueron cuando&nbsp;<strong>Candyman</strong>&nbsp;libera abejas de su boca, para ello&nbsp;<strong>Tony Todd</strong>&nbsp;aceptó ser picado por los insectos reales. Aunque usó una protección especial en la boca, recibió múltiples picaduras.</p>', 'cover-1715102423906.jpg', '2024-05-07 14:19:21', 1, 'cinema'),
(3, 'Construyen un robot humanoide que funciona gracias a ChatGPT', '<p><span style=\"background-color: rgb(253, 251, 255); color: rgb(34, 34, 34);\">Figure AI y&nbsp;</span><span style=\"background-color: rgb(253, 251, 255); color: rgb(111, 52, 229);\">OpenAI</span><span style=\"background-color: rgb(253, 251, 255); color: rgb(34, 34, 34);\">&nbsp;ha dado un gran paso en el desarrollo de robots humanoides con Figure 01, un robot que supera al Tesla Bot en habilidades ya que es&nbsp;</span><strong style=\"background-color: rgb(253, 251, 255); color: rgb(34, 34, 34);\">capaz de tener una conversación gracias a ChatGPT</strong><span style=\"background-color: rgb(253, 251, 255); color: rgb(34, 34, 34);\">. Este avance destaca el potencial de integrar la inteligencia artificial en robots con fines generales, un proyecto que ha reunido a expertos de compañías líderes como Boston Dynamics y Tesla.</span></p><p>Brett Adcock, el emprendedor detrás de Figure, ha logrado en poco tiempo un progreso notable desde que la compañía salió del anonimato, mostrando al robot no solo&nbsp;<strong>caminando y realizando tareas autónomas</strong>, sino también comunicándose de manera efectiva, marcando un hito en la robótica humanizada. Figure es capaz de identificar objetos en su entorno, saber lo que son (color y para qué sirven), diferenciar entre comida y basura e<strong>&nbsp;incluso atender a peticiones humanas</strong>. También recoge las cosas de encima de la mesa (ya hace más que muchos adolescentes) y hasta hace café de máquina.</p><p><br></p><h2>Capacidad para caminar, coger objetos y mantener una conversación</h2><p>El robot Figure 01, dotado con c<strong>ámaras integradas y entrenado por OpenAI</strong>, puede comprender palabras y traducir esta información en acciones rápidas, un avance celebrado por Adcock tal y como ha mostrado en un vídeo del prototipo. Esta capacidad no solo muestra la complejidad de las tareas que puede realizar, sino también la fluidez de su interacción en situaciones cotidianas como&nbsp;<strong>identificar objetos y responder a solicitudes humanas</strong>. La demostración, realizada a velocidad real y sin operación remota, pone de manifiesto la sofisticación del modelo de IA implementado, prometiendo un futuro donde los robots podrían operar a un nivel previamente inimaginable en la industria.</p>', 'cover-1715102914390.jpg', '2024-05-07 14:21:51', 2, 'technology'),
(4, 'La NASA está creando un ChatGPT para ‘hablar’ con sus naves espaciales', '<p>La&nbsp;<strong>NASA</strong>&nbsp;tiene grandes planes para el uso de la inteligencia artificial en el espacio. Uno de ellos es&nbsp;<strong>crear su propia interfaz de lenguaje natural al estilo ChatGPT</strong>. La agencia espacial estadounidense busca, en principio, que el sistema asista a los astronautas durante las misiones en el espacio. Pero la idea a futuro es mucho más ambiciosa:&nbsp;<strong>que sea el puente que les permita \"conversar\" directamente con las naves espaciales</strong>.</p><p><br></p><p>La Dra. Larissa Suzuki, quien se desempeña en Google como directora técnica y en la NASA como investigadora visitante, explicó cómo se está abordando esta iniciativa. Durante una reciente conferencia en Londres (vía&nbsp;<a href=\"https://www.theguardian.com/science/2023/jun/24/nasa-spaceships-talk-chatgpt-larissa-suzuki\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--newspack-theme-color-secondary-against-white); background-color: transparent;\"><em>The Guardian</em></a>), comentó que la primera versión de esta tecnología tipo ChatGPT&nbsp;<strong>se incorporará en la estación espacial Gateway</strong>, que orbitará la Luna como parte de las misiones Artemis.</p><p><br></p><p>Sin embargo, el potencial de esta IA sería muchísimo más grande del que podríamos imaginar.&nbsp;<strong>Poder&nbsp;</strong>\"<strong>hablar</strong>\"<strong>&nbsp;con máquinas utilizando lenguaje natural dejaría de ser una utopía o un elemento de ciencia ficción</strong>. \"La idea es llegar a un punto en el que tengamos interacciones conversacionales con vehículos espaciales y ellos también nos respondan sobre alertas, hallazgos interesantes que vean en el sistema solar y más allá\", aseguró Suzuki.</p>', 'cover-1715103127401.jpg', '2024-05-07 14:30:56', 2, 'technology'),
(5, 'Milanesa Napolitana: Receta', '<p>La milanesa napolitana es, más que un plato rioplatense, todo un símbolo del plato abundante, de la persona a la que le gusta comer bien, quedar pipón, saciarse con la comida. Hasta te diría que de la larga sobremesa, porque uno come una milanesa a la napolitana y luego no se puede levantar. Milanesa napolitana es sinónimo de comer con placer, de disfrute con&nbsp;la comida. Por esto es que hay un&nbsp;<a href=\"https://www.clarin.com/sociedad/milanesa-napolitana-podria-patrimonio-cultural_0_r1GgMoGy0tx.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var( --e-global-color-primary ); background-color: transparent;\">proyecto de ley para convertir la milanesa en Patrimonio Cultural Argentino</a>. No solo porque es rica.</p><p><br></p><h2>Ingredientes:</h2><p><br></p><p>Milanesas</p><p>150g de queso mozzarella</p><p>150g de jamón cocido</p><p>Una lata de puré de tomate</p><p>Una cebolla</p><p>2 dientes de Ajo</p><p>2 hojas de Laurel fresco</p><p>Aceite</p><p>Sal</p><p><br></p><h2>Receta de milanesa napolitana paso a paso</h2><p>Lo primero que vamos a hacer una vez que tengamos nuestras milanesas hechas (o compradas) es meterlas al horno 180º hasta que estén bastante cocidas. También las pueden freír si así lo desean. Procuren hacerlo con abundante aceite en la sartén y tengan en cuenta que esté bien caliente antes de meter las milanesas. Es más que nada para que éstas no absorban aceite de más. Una vez que las tenemos cocidas, las reservamos.</p><p><br></p><h3>Para la salsa de tomate</h3><ol><li>Piquamos el ajo y la cebolla.</li><li>Calentamos una olla con aceite, ponemos el ajo y la cebolla dentro y esperamos que la cebolla se transparente.</li><li>Después, agregamos el puré de tomate y las dos hojas de laurel, deje cocinar por alrededor de 20 minutos.</li><li>Agregamos sal y pimienta a gusto.</li></ol><h3>Armado de la milanesa</h3><ol><li>Vamos colocar primero, por encima de nuestra milanesa, la salsa que acabamos de hacer.</li><li>Luego, colocamos unas fetas de jamón cocido</li><li>Finalmente, por encima, ponemos nuestro queso.</li><li>Así, las vamos a llevar al horno 180º hasta que se derrita el queso y chorree por los costados generando el efecto más hermoso y tentador del universo.</li><li>Al sacarlas podemos tirar por encima unas pizcas de orégano y ¡listo!</li></ol>', 'cover-1715266269138.jpg', '2024-05-09 11:51:55', 1, 'food'),
(6, 'PLATOS TÍPICOS ARGENTINOS', '<p>Argentina en cada una de sus regiones ofrece platos típicos que transmiten su cultura y tradición, sin dejar a un lado la diversidad de sus recetas que nos brindan aromas, colores y sabores en cada bocado.</p><p>En Recetas Nestlé® te invitamos a hacer un viaje gastronómico por Argentina, descubriendo y saboreando los 11 platos típicos que debes probar cuando visites este país.</p><p>&nbsp;</p><h2>ASADO</h2><p>El asado es el plato insignia de argentina, proveniente de llanura pampeana donde más que una comida típica, hacer asados se convierte en todo un ritual. El asado incluye diferentes tipos de cortes de carne de vaca o de cerdo, acompañados de prietas, chorizos, costillitas, etc.</p><p>El asado es el gran protagonista en la Provincia de Buenos Aires, aunque también hay otra versión de asado en la Patagonia que es el curanto, este tiene la particularidad de ser un asado que se cocina bajo tierra por las condiciones climáticas de la región. Allí se usan ingredientes como la carne de vaca, cordero, chivito, pollo, cerdo o mariscos acompañados por una gran variedad de vegetales.</p><p>Conoce esta adaptación del asado argentino con esta receta de&nbsp;<a href=\"https://www.recetasnestle.cl/recetas/lomo-de-centro-con-chimichurri\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgba(var(--color-1), 1);\"><strong>lomo de centro con chimichurri</strong></a>.</p><p><br></p><h2>ALFAJAROES</h2><p>El alfajor es un dulce tradicional de la gastronomía argentina con gran fama internacional. Son dos galletas unidas por un relleno de frutas, chocolate o algún tipo de mousse, pero sin duda los más populares son los que están rellenos con dulce de leche.</p><p>Trae Argentina a tu mesa con esta deliciosa receta de&nbsp;<a href=\"https://www.recetasnestle.cl/recetas/alfajores-de-maicena-2\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgba(var(--color-1), 1);\"><strong>alfajores de maicena</strong></a>.</p><p>&nbsp;</p><h2>LOCRO</h2><p>El locro es una especie de sopa espesa y abundante hecha de choclo, porotos, papas y zapallo con algún tipo de carne y condimentada con comino, laurel, ajo, perejil y otras hierbas, aunque la receta puede cambiar según la tradición de cada provincia argentina. Es uno de los platos nacionales por excelencia siendo la preparación obligada en invierno y se come tradicionalmente el 25 de mayo y el 9 de julio que son fechas patrias en Argentina.</p><p>Esta receta es de origen precolombino y proviene del norte del país que los pueblos quechua preparaban para pasar los inviernos en las frías montañas del país. Tiene una influencia de otros pueblos andinos. Su consumo se ha extendido desde el Noroeste y Cuyo hacia el resto del país.</p><p>&nbsp;</p><h2>LA MILANESA</h2><p>La carne es un elemento fundamental en la gastronomía argentina y la milanesa es un ejemplo de esto. La milanesa es una rebanada delgada de carne rebozada en pan rallado y frita quedando dorada y crujiente por fuera y tierna por dentro.</p><p><br></p><p><span style=\"color: rgb(37, 37, 37);\">Este plato tiene sus raíces en Italia, siendo una preparación original de la ciudad de Milán, pero con la migración sufrió pequeños cambios hasta convertirse en la milanesa argentina de la cual encontramos una gran variedad de recetas, siendo muy popular la milanesa napolitana, que está cubierta de salsa de tomate, queso y orégano la cual generalmente se acompaña con puré de papa o ensalada.</span></p>', 'cover-1715266937595.jpg', '2024-05-09 11:59:09', 1, 'food'),
(7, 'Quedan más de 7900 años para el lanzamiento de Hollow Knight: Silksong', '<p>Pasa el tiempo y&nbsp;<strong>Hollow Knight: Silksong</strong>&nbsp;sigue sin aparecer en nuestras vidas. El<strong>&nbsp;</strong>metroidvania de Team Cherry se resiste a dar la cara desde su presentación para PC y Nintendo Switch. Queremos encarnar a&nbsp;<strong>Hornet</strong>&nbsp;cuanto antes, pero el equipo de desarrollo se está tomando su tiempo para lanzar definitivamente la obra.</p><p><br></p><p>Por ello, vamos a recopilar toda la información que conocemos hasta el momento de&nbsp;<strong>Hollow Knight: Silksong</strong>. Aquí encontraréis rumores, información oficial, tráilers e imágenes para que tengáis claro en qué momento exacto nos encontramos del desarrollo del título.</p><p><br></p><h2>Jugabilidad</h2><p>No parece que vayamos a tener novedades espectaculares en<strong>&nbsp;Hollow Knight: Silksong</strong>, sino que será más ración de lo mismo. Estamos hablando de un&nbsp;<strong>Action RPG de scroll lateral con toques de Souls</strong>, ya que cada enfrentamiento es un desafío por sí mismo. Por supuesto, no podemos olvidarnos de inolvidables jefes que nos pondrán las cosas realmente difíciles. Entre ellos encontraremos a&nbsp;Se<span class=\"ql-cursor\">﻿</span>th, un jefazo que rinde homenaje a un fan. En total, el bestiario estará conformado por más de 150 criaturas.</p><p>Podremos recoger todo nuestro equipo tras resucitar, al igual que en la franquicia de Hidetaka Miyazaki, que estará guardado en un capullo de seda. Entre los cambios respecto a jugar con Hornet o The Knight, nos topamos con que la nueva protagonista tiene más habilidades de esquiva y esprint. Además, puede curarse mucho más rápido y también habla, lo cual son diferencias más que obvias respecto a la anterior obra.</p><p>La seda también será una de las principales herramientas de ataque de Hornet, más allá de usar bombas o bolas de pinchos. De hecho, podrá crear sus propios objetos con diferentes recursos. Podremos hacer uso de&nbsp;<strong>Rosarios y Fragmentos de conchas</strong>, que tienen funciones distintas. Los primeros sirven para comprar cualquier elemento que necesitemos y podemos perderlos al morir si no los colocamos en una cuerda.</p>', 'cover-1715267481853.jpg', '2024-05-09 12:08:54', 2, 'videogame'),
(8, 'STALKER 2: Heart of Chornobyl confirma su fecha de lanzamiento', '<h3><strong style=\"background-color: rgba(0, 0, 0, 0);\">¿Por qué se ha retrasado tanto?</strong></h3><p>Es posible que STALKER 2 sea&nbsp;<span style=\"background-color: rgba(0, 0, 0, 0);\">el título con el que más comprensivos hay que ser</span>&nbsp;en materia de retrasos. Es el juego que más argumentos tiene para justificarlos. ¿Cuál es ese motivo, os preguntáis? Que GSC <strong>Game World</strong> es un estudio ucraniano que se ha visto&nbsp;<span style=\"background-color: rgba(0, 0, 0, 0);\">sacudido por la guerra con Rusia</span>.</p><p><br></p><p>Muchos de sus integrantes&nbsp;<u>abandonaron el desarrollo para defender su país</u>&nbsp;e incluso llegaron a amenazar con que no habría más novedades&nbsp;<span style=\"background-color: rgba(0, 0, 0, 0);\">hasta el fin del conflicto</span>. Es más,&nbsp;el juego hasta cambió de nombre&nbsp;como reivindicación ante la invasión Rusia. Por internet circulan varios&nbsp;diarios de desarrollo&nbsp;sobre&nbsp;<span style=\"background-color: rgba(0, 0, 0, 0);\">cómo les ha afectado la guerra</span>&nbsp;y resultan desoladores.</p><p><br></p><p>En un reciente -y bastante extenso- mensaje de Twitter, la desarrolladora se sinceró con los aficionados que llevan mucho tiempo esperando la llegada de&nbsp;<strong>STALKER 2</strong>, reconociendo que “<em>ha sido un desafiante proceso de desarrollo para el equipo</em>”. El posteo continúa mencionando que necesitan un mayor tiempo para pulir el juego a nivel técnico y finalmente concluye con un agradecimiento a los fans por su “<em>paciencia y apoyo</em>”.</p><p><br></p><p>“<em>Aunque no hay absolutamente ninguna forma de hacer que otro retraso suene menos sombrío, hemos decidido ser claros sobre nuestras razones para posponer el juego y entrar en una nueva ola de pulido</em>”, expresaron desde la cuenta oficial del juego.</p><p><br></p><p><strong style=\"color: rgb(31, 31, 31);\">STALKER 2: Heart of Chornobyl</strong><span style=\"color: rgb(31, 31, 31);\">&nbsp;llegará a PC, Xbox Series X y Xbox Series S, con disponibilidad en Xbox Game Pass el 5 de septiembre de 2024.</span></p>', 'cover-1715267764139.jpg', '2024-05-09 12:13:12', 2, 'videogame');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `profile` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `profile`) VALUES
(1, 'compas.inc', 'compa@gmail.com', '$2b$12$kiPZoF0lnon8IcXwqaykBuQCZKU8p9eE44DSJ5LpFJRkRjX0nphOC', NULL),
(2, 'leonidas', 'leonidas@gmail.com', '$2b$12$vpK9BTiE9AzaiIzo1axKvek0FZ09nUk38f2bNnAscHLK6gN9XJCgq', 'https://leonidasvalen.github.io/Portfolio/img/leo.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;


--
-- Metadatos
--
USE `phpmyadmin`;

--
-- Metadatos para la tabla posts
--

--
-- Volcado de datos para la tabla `pma__table_uiprefs`
--

INSERT INTO `pma__table_uiprefs` (`username`, `db_name`, `table_name`, `prefs`, `last_update`) VALUES
('root', 'blog', 'posts', '{\"CREATE_TIME\":\"2024-05-02 18:07:29\",\"col_order\":[0,1,2,4,3,5,6],\"col_visib\":[1,1,1,1,1,1,1],\"sorted_col\":\"`posts`.`descrip` ASC\"}', '2024-05-06 23:38:34');

--
-- Metadatos para la tabla users
--

--
-- Volcado de datos para la tabla `pma__table_uiprefs`
--

INSERT INTO `pma__table_uiprefs` (`username`, `db_name`, `table_name`, `prefs`, `last_update`) VALUES
('root', 'blog', 'users', '{\"sorted_col\":\"`id` ASC\"}', '2024-05-09 14:48:09');

--
-- Metadatos para la base de datos blog
--
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
