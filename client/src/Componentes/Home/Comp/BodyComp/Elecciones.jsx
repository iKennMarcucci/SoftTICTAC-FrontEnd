import React from 'react'

function Elecciones({ eleccion }) {

   return (
      <>
         <div className='border-delgado my-4 mx-10 max-sm:mx-2 max-sm:px-3 py-5 px-10 text-justify'>
            {
               eleccion === 1 ? (
                  <>
                     <h5 className='text-center text-xl font-medium mb-2'>NUESTRO MODELO TIC TAC</h5>
                     <p className='mb-4'>
                        <b className='italic'>TIC TAC: Tecnologías para la transformación social en la apropiación de competencias</b>, es el nombre del libro escrito por nueve (9) docentes vinculados a seis (6) grupos de investigación de la Universidad Francisco de Paula Santander, pertenecientes a diferentes campos disciplinares como la ingeniería de sistemas, las ciencias contables, las ciencias de la salud, el trabajo social, la comunicación y el ámbito agropecuario, industrial y del medio ambiente.
                     </p>
                     <p className='mb-4'>
                        El texto académico, es el resultado del estudio realizado por los docentes a través del macroproyecto transdisciplinar, <b className='italic'>MODELO DE ATENCIÓN INTEGRAL PARA EL FOMENTO DE LA CULTURA DE EMPRENDIMIENTO, EDUCACIÓN AMBIENTAL, FORMACIÓN DE DERECHOS HUMANOS, FORMACIÓN PARA LA SEXUALIDAD Y LA CONSTRUCCIÓN DE LA CIUDADANÍA MEDIANTE EL USO Y LA APROPIACIÓN DE LAS TIC EN LAS IE DEL MUNICIPIO DE SARDINATA, NORTE DE SANTANDER</b>, el cual contó con el financiamiento del Fondo de Investigaciones Universitarias – FINU, UFPS.
                     </p>
                     <p className='mb-4'>
                        Pilar Rojas Puentes, docente del programa de Ingeniería de Sistemas y coautora del texto, explicó que el libro consolida el análisis e intervención en la articulación de las políticas públicas con los ejes transversales de la Instituciones Educativas del municipio, recogiendo la experiencia del trabajo desarrollado por cada uno de los docentes desde sus áreas del conocimiento.
                     </p>
                     <p className='mb-4 italic'>
                        “Los proyectos transversales que entramos a revisar y trabajar en cada una de las Instituciones Educativas, fueron los de emprendimiento, salud escolar, educación ambiental y educación para la justicia y paz, esto con el fin de lograr en las comunidades académicas una mayor apropiación y complemento con las políticas públicas”.
                     </p>
                  </>
               ) : eleccion === 2 ? (
                  <>
                     <h5 className='text-center text-xl font-medium mb-2'>EJES DE FORMACIÓN</h5>
                     <p className='mb-4'>
                        El Modelo TIC TAC, como se denominará de aquí en adelante, constituye un producto de investigación y reflexión diseñado para fortalecer las prácticas pedagógicas de los docentes, permitiendo que los estudiantes adquieran quince (15) competencias que se han priorizado desde cinco ejes estratégicos:
                     </p>
                     <table className='border-delgado'>
                        <thead className='border-delgado bg-blue-100 text-center'>
                           <tr>
                              <th className='border-delgado'>Eje Transversal</th>
                              <th className='border-delgado'>Competencia</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr className='border-delgado'>
                              <td className='border-delgado w-1/2 text-center'>
                                 Competencias en el eje de formación en relaciones sociales y prácticas cívicas
                              </td>
                              <td className='border-delgado px-5'>
                                 <p className='my-6'>
                                    • Participa activamente en los ámbitos sociales e interpersonales, manifestando solidaridad e interés por la comunidad.
                                 </p>
                                 <p>
                                    • Capacidad de comunicarse constructivamente.
                                 </p>
                                 <p className='my-6'>
                                    • Conoce y aplica las normas de tránsito y seguridad vial.
                                 </p>
                              </td>
                           </tr>

                           <tr className='border-delgado'>
                              <td className='border-delgado w-1/2 text-center'>
                                 Competencias en el eje de formación para la sexualidad y construcción de ciudadanía
                              </td>
                              <td className='border-delgado px-5'>
                                 <p className='my-6'>
                                    • Comprende los aspectos de la sexualidad humana, sus transiciones e implicaciones en la vida cotidiana.
                                 </p>
                                 <p>
                                    • Identifica la diversidad que existe en los seres humanos y sus formas de expresarla.
                                 </p>
                                 <p className='my-6'>
                                    • Toma decisiones centradas en el enfoque de derechos sexuales y reproductivos.
                                 </p>
                              </td>
                           </tr>

                           <tr className='border-delgado'>
                              <td className='border-delgado w-1/2 text-center'>
                                 Competencias en el eje de formación en Educación Ambiental
                              </td>
                              <td className='border-delgado px-5'>
                                 <p className='my-6'>
                                    • Comprende los procesos de cuidado y protección del medio ambiente.
                                 </p>
                                 <p>
                                    • Cuida y protege el medio ambiente.
                                 </p>
                                 <p className='my-6'>
                                    • Promueve en su comunidad el cuidado y protección del medio ambiente.
                                 </p>
                              </td>
                           </tr>

                           <tr className='border-delgado'>
                              <td className='border-delgado w-1/2 text-center'>
                                 Competencias en el eje de formación de Emprendimiento
                              </td>
                              <td className='border-delgado px-5'>
                                 <p className='my-6'>
                                    • Desarrolla pensamiento emprendedor en el ser, sentir, pensar y actuar.
                                 </p>
                                 <p>
                                    • Desarrolla hábitos y valores emprendedores que orienten el comportamiento para el éxito personal.
                                 </p>
                                 <p className='my-6'>
                                    • Tiene capacidad para entender el entorno socioeconómico en su contexto.
                                 </p>
                              </td>
                           </tr>

                           <tr className='border-delgado'>
                              <td className='border-delgado w-1/2 text-center'>
                                 Competencias en el eje de formación en Tecnologías de Información y Comunicación
                              </td>
                              <td className='border-delgado px-5'>
                                 <p className='my-6'>
                                    • Comprende que las TIC facilitan responder a problemas de su entorno y se deben utilizar de manera responsable.
                                 </p>
                                 <p>
                                    • Integra las TIC en el desarrollo de las actividades académicas y cotidianas para facilitar y agilizar los procesos operativos en los diferentes contextos.
                                 </p>
                                 <p className='my-6'>
                                    • Construye soluciones a problemas del contexto usando las TIC.
                                 </p>
                              </td>
                           </tr>
                        </tbody>
                     </table>

                  </>
               ) : eleccion === 3 && (
                  <>
                     <h5 className='text-center text-xl font-medium mb-4'>COMPETENCIAS A DESARROLLAR</h5>
                     <div className='mb-10'>
                        <h5 className='text-lg font-medium mb-2'>
                           Competencias en el eje de formación en relaciones sociales y prácticas cívicas
                        </h5>
                        <p className='mb-4'>
                           De acuerdo con el documento del Ministerio de Educación Nacional denominado Formar para la ciudadanía… ¡sí es posible! (Chaux, et al, 2004), expertos en el tema definen las competencias ciudadanas como habilidades y conocimientos cognitivos, emocionales y comunicativos que se aprenden, desarrollan y practican para manejar pacífica y constructivamente los conflictos que día a día se presentan en la interacción con el otro. De esta manera, es mediante el conocimiento de los mecanismos constitucionales para defender los derechos, las alternativas creativas de solución, el desarrollo de las habilidades para la vida y la capacidad de escucha, entre otros, que se puede construir una sociedad democrática, pacífica e incluyente, en donde la familia y las instituciones educativas son los espacios propicios para desarrollarlas, puesto que son los espacios de socialización iniciales de todo individuo y más frecuentes en el curso de vida.
                        </p>
                        <p className='mb-4'>
                           Para el Modelo tic-tac se asume, dentro de este eje transversal, la seguridad vial escolar, la cual se concibe como una temática generadora de vida que facilita el desarrollo de una cultura en defensa de la movilidad humana y segura (Bogotá, s.f). Se construye a partir del conocimiento, por parte de los ciudadanos, de las normas que regulan la circulación de vehículos y personas, así como la adquisición de valores, hábitos y actitudes que permitan dar una respuesta segura en las distintas situaciones de tránsito en las que se vean inmersos como peatones, pasajeros o conductores. Es en este sentido que se propone el espacio público como un espacio socializador, como un bien común.
                        </p>
                        <p className='mb-4'>
                           En virtud de lo anterior, las competencias priorizadas son:
                        </p>
                        <ul>
                           <li>» Participación activa en los ámbitos sociales e interpersonales, manifestando solidaridad e interés por la comunidad.</li>
                           <li>» Capacidad de comunicarse constructivamente.</li>
                           <li>» Conocimiento y aplicación de las normas de tránsito y seguridad.</li>
                        </ul>
                     </div>

                     <div className='mb-10'>
                        <h5 className='text-lg font-medium mb-2'>
                           Competencias en el eje de formación para la sexualidad y construcción de ciudadanía
                        </h5>
                        <p className='mb-4'>
                           La educación para la sexualidad y construcción de ciudadanía tiene como objetivo, en primera instancia, la promoción de la sexualidad, asunto que implica el reconocimiento y la práctica de los derechos humanos y la garantía del ejercicio de los derechos sexuales y reproductivos. Por ello, este eje se alinea con el enfoque de género, diferencial y de derechos, en donde cada sujeto, de acuerdo con su contexto y cultura, adquiere competencias para ejercer la sexualidad de forma plena, digna, segura y autónoma. Es, además, una oportunidad para develar estigmas y poder contrarrestarlos, así como para generar una reflexión sobre el cuerpo, la sexualidad de manera integral y los hábitos saludables (unfpa-mps, 2008).
                        </p>
                        <p className='mb-4'>
                           En ese sentido, acogiendo las directrices del Ministerio de Educación Nacional (2008), este proyecto pedagógico de educación para la sexualidad y construcción de ciudadanía de definió como el conjunto de acciones que plantea y ejecuta una institución educativa para abordar el tema -lo cual es parte del proyecto de vida de los miembros que conforman la comunidad-, orientado a desarrollar competencias en lo concerniente a la vivencia de la sexualidad (Bedoya, 2014) y la toma de decisiones responsables, informadas y autónomas sobre el propio cuerpo, además del respeto a la dignidad de todo ser humano, la valoración de la pluralidad de identidades y formas de vida, junto con la vivencia y construcción de relaciones pacíficas, equitativas y democráticas.
                        </p>
                        <p className='mb-4'>
                           Estas consideraciones dieron pie a que, en este apartado, las competencias priorizadas fueran las siguientes:
                        </p>
                        <ul>
                           <li>» Comprensión de los aspectos de la sexualidad humana, sus transiciones e implicaciones en la vida cotidiana.</li>
                           <li>» Identificación de la diversidad que existe entre los seres humanos y sus diversas formas de expresarla.</li>
                           <li>» Toma decisiones centradas en el enfoque de derechos sexuales y reproductivos.</li>
                        </ul>
                     </div>

                     <div className='mb-10'>
                        <h5 className='text-lg font-medium mb-2'>
                           Competencias en el eje de formación en educación ambiental
                        </h5>
                        <p className='mb-4'>
                           A partir de la política adoptada por el Consejo Nacional Ambiental el 16 de junio de 2002, que tuvo en cuenta la legislación dada conjuntamente por el Ministerio de Medio Ambiente, Vivienda y Desarrollo Territorial y el Ministerio de Educación Nacional, se concibe la educación ambiental como la formación de una cultura ética en el manejo del ambiente y como un proceso que permite al ser humano comprender las relaciones de interdependencia con su contexto, además de fomentar en él y en su comunidad actitudes de valoración y respeto por el medio ambiente (Wilches, 2006).
                        </p>
                        <p className='mb-4'>
                           De esta forma, los Proyectos Ambientales Escolares (prae) promueven el análisis y la comprensión de los problemas y las potencialidades ambientales locales, regionales y nacionales, generando espacios de participación para implementar soluciones acordes con las dinámicas naturales y socioculturales. Este proceso tiene un carácter de transversalidad e interdisciplinariedad -requeridos para la formación integral en un ambiente sostenible que se enfoque en la transformación de realidades locales, regionales y/o nacionales- y, según Wilches (2006), propicia una formación en el ser, en el saber y en el saber hacer, en el marco de una ética coherente con el manejo sostenible del ambiente.
                        </p>
                        <p className='mb-4'>
                           A partir de los anteriores postulados, las competencias priorizadas son:
                        </p>
                        <ul>
                           <li>» Comprensión de los procesos de cuidado y protección del medio ambiente.</li>
                           <li>» Cuidado y protección el medio ambiente.</li>
                           <li>» Promoción, en su comunidad, del cuidado y protección del medio ambiente.</li>
                        </ul>
                     </div>

                     <div className='mb-10'>
                        <h5 className='text-lg font-medium mb-2'>
                           Competencias en el eje de emprendimiento
                        </h5>
                        <p className='mb-4'>
                           La Ley 1014 de 2006 sobre fomento a la cultura del emprendimiento, en su artículo 1, literal e, contempla que “la formación para el emprendimiento busca el desarrollo de la cultura del emprendimiento con acciones que buscan, entre otros, la formación en competencias básicas, competencias laborales, competencias ciudadanas y competencias empresariales dentro del sistema educativo formal y no formal y su articulación con el sector productivo”. También establece, en su artículo 13, que su enseñanza es obligatoria y que propende por transmitir conocimiento en todos los niveles escolares, formar actitud favorable para el emprendimiento, la innovación y la creatividad, además de desarrollar competencias para generar empresas.
                        </p>
                        <p className='mb-4'>
                           Las competencias que los estudiantes deben identificar, conservar y adquirir, a la luz de esta normatividad, les permitirá un desempeño exitoso en su proceso de enseñanza-aprendizaje. En lo concerniente a las competencias aplicadas al emprendimiento, es importante agregar que “la competencia de un sujeto depende de las exigencias de diverso orden -cognitivas, comunicativas, estéticas, axiológicas, etc.- del entorno cultural en el que se desenvuelve; así mismo, tal entorno actúa como posibilitador o inhibidor de dichas competencias” (Ahumada, 2013, citando a Duarte y Cuchimaque, 1999).
                        </p>
                        <p className='mb-4'>
                           Bajo esta premisa, las competencias priorizadas para este eje de emprendimiento son las siguientes:
                        </p>
                        <ul>
                           <li>» Desarrollo de pensamiento emprendedor en el ser, sentir, pensar y actuar.</li>
                           <li>» Desarrollo de hábitos y valores emprendedores que orienten el comportamiento para el éxito personal.</li>
                           <li>» Capacidad de entender el entorno socioeconómico en su contexto.</li>
                        </ul>
                     </div>

                     <div className='mb-10'>
                        <h5 className='text-lg font-medium mb-2'>
                           Competencias en el eje de formación en Tecnologías de la Información y la Comunicación – TIC
                        </h5>
                        <p className='mb-4'>
                           La competencia digital conlleva el uso seguro y crítico de las tecnologías de la sociedad de la información (TSI) y se sustenta en las competencias básicas de TIC. Su utilización requiere una buena comprensión y amplios conocimientos sobre la naturaleza y función de las TSI, las aplicaciones informáticas y las oportunidades y riesgos potenciales que ofrecen tanto internet como la comunicación por medios electrónicos para la vida profesional, el ocio, las redes de colaboración, el aprendizaje y la investigación (García-Valcárcel Muñoz-Repiso, 2019).
                        </p>
                        <p className='mb-4'>
                           García-Valcárcel (2019) define la competencia digital como aquella que resulta fundamental para el desarrollo de los ciudadanos y que implica el uso crítico y seguro de las tecnologías propias de la sociedad de la información tanto en el ámbito del trabajo como en los procesos de comunicación y en el tiempo libre, apoyándose en habilidades y destrezas relacionadas con el uso del computador para recuperar, evaluar, almacenar, producir, presentar e intercambiar información, además de comunicarse y participar cotidianamente en redes de colaboración a través de Internet.                        </p>
                        <p className='mb-4'>
                           De esta forma, se han diseñado tres competencias priorizadas por cada uno de los ejes de formación que se desarrollaron desde el Modelo tic-tac, entendiéndolas como la capacidad que posee un individuo para desarrollar habilidades y destrezas que le permitan desempeñarse exitosamente en diferentes contextos. Así las cosas, se espera que, a partir de la aplicación del modelo, el estudiante logre las siguientes competencias:
                        </p>
                        <ul>
                           <li>» Comprender que las tic facilitan responder a problemas de su entorno y se deben utilizar de manera responsable.</li>
                           <li>» Integrar las tic en el desarrollo de las actividades académicas y cotidianas para facilitar y agilizar los procesos operativos en los diferentes contextos.</li>
                           <li>» Construir soluciones a problemas del contexto usando las tic.</li>
                        </ul>
                     </div>
                  </>
               )
            }
         </div>
      </>
   )
}

export default Elecciones