import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import Profesional1 from '../../assets/img/Profesionales/prof1.jpg';
import Profesional2 from '../../assets/img/Profesionales/prof2.jpg';
import Profesional3 from '../../assets/img/Profesionales/prof3.jpg';
import Profesional4 from '../../assets/img/Profesionales/prof4.jpg';
import Profesional5 from '../../assets/img/Profesionales/prof5.jpg';
import Profesional6 from '../../assets/img/Profesionales/prof6.jpg';
import Profesional7 from '../../assets/img/Profesionales/prof7.jpg';
import Profesional8 from '../../assets/img/Profesionales/prof8.jpg';

const profesionalesData = [
    {
        img: Profesional1,
        name: "Tiare Castro Correa",
        title: "Co-fundadora | Kinesióloga",
        description: "Especialista en kinesiología músculo-esquelética y neurológica en adultos. Con 6 años de experiencia clínica y formación en cursos de dolor. También es docente en la Universidad Católica Silva Henríquez."
    },
    {
        img: Profesional2,
        name: "Jessamine Castro Novoa",
        title: "Co-fundadora | Kinesióloga",
        description: "Especialista en kinesiología músculo-esquelética y neurológica infantil, con 4 años de experiencia clínica. Tiene formación en punción seca, atención temprana y desarrollo psicomotor. Supervisión y docencia clínica en la Universidad Católica Silva Henríquez."
    },
    {
        img: Profesional3,
        name: "Daniela Baeza C.",
        title: "Masoterapeuta",
        description: "Especialista en masajes terapéuticos, con 3 años de experiencia clínica. Enfocada en el manejo del dolor agudo y persistente."
    },
    {
        img: Profesional4,
        name: "Dagmar Vallejos Silva",
        title: "Nutricionista",
        description: "Con un enfoque integral y no pesocentrista, Dágmar tiene 3 años de experiencia en nutrición vegetariana, salud intestinal y cirugía bariátrica. Su objetivo es guiar a los pacientes hacia una alimentación saludable sin prohibiciones."
    },
    {
        img: Profesional5,
        name: "Fabiola Madrid Rojas",
        title: "Terapeuta Ocupacional",
        description: "Especializada en la atención de niños, niñas y adolescentes, Fabiola trabaja para potenciar habilidades y mejorar la calidad de vida mediante estrategias personalizadas. Cuenta con formación en integración sensorial y neurodesarrollo, y le apasiona trabajar con niños con TDAH y TEA."
    },
    {
        img: Profesional6,
        name: "Karen Espinoza Chavez",
        title: "Kinesióloga",
        description: "Especialista en kinesiología respiratoria y piso pélvico, con 7 años de experiencia. Tiene formación en infecciones respiratorias agudas y un diplomado en kinesiología pélvica y uroginecología funcional."
    },
    {
        img: Profesional7,
        name: "Nicolás Rivas Soto",
        title: "Kinesiólogo",
        description: "Egresado de la Universidad Católica Silva Henríquez, Nicolás se especializa en kinesiología músculo-esquelética, cardiorrespiratoria pediátrica y neurología en adultos mayores."
    },
    {
        img: Profesional8,
        name: "Johana Sépulveda Neipan",
        title: "Kinesióloga",
        description: "Especialista en kinesiología respiratoria y piso pélvico, con 6 años de experiencia. Participa en las Campañas de Invierno de Pudahuel y ha realizado un diplomado en Kinesiología de Piso Pélvico y Uroginecología Funcional."
    }
];

export function Profesionales() {
    return (
        <div className="flex flex-col items-center mb-4">
            {/* Primera fila: 2 cards */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
                <Card className="flex items-center justify-center w-96 border border-gray-300">
                    <CardHeader floated={false} className="h-56">
                        <img
                            src={profesionalesData[0].img}
                            alt={`profesional1`}
                            className="h-48 w-48 rounded-full object-cover"
                        />
                    </CardHeader>
                    <CardBody className="flex flex-col items-center text-center h-48">
                        <h1 className="text-xl text-black">{profesionalesData[0].name}</h1>
                        <h2 className="text-md font-semibold text-deep-purple-300">{profesionalesData[0].title}</h2>
                        <p className="text-blue-gray text-xs">
                            {profesionalesData[0].description}
                        </p>
                    </CardBody>
                </Card>
                <Card className="flex items-center justify-center w-96 border border-gray-300">
                    <CardHeader floated={false} className="h-56">
                        <img
                            src={profesionalesData[1].img}
                            alt={`profesional2`}
                            className="h-48 w-48 rounded-full object-cover"
                        />
                    </CardHeader>
                    <CardBody className="flex flex-col items-center text-center h-48">
                        <h1 className="text-xl text-black">{profesionalesData[1].name}</h1>
                        <h2 className="text-md font-semibold text-deep-purple-300">{profesionalesData[1].title}</h2>
                        <p className="text-blue-gray text-xs">
                            {profesionalesData[1].description}
                        </p>
                    </CardBody>
                </Card>
            </div>

            {/* Segunda fila: 3 cards */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
                {profesionalesData.slice(2, 5).map((profesional, index) => (
                    <Card key={index + 2} className="flex items-center justify-center w-96 border border-gray-300">
                        <CardHeader floated={false} className="h-56">
                            <img
                                src={profesional.img}
                                alt={`profesional${index + 3}`}
                                className="h-48 w-48 rounded-full object-cover"
                            />
                        </CardHeader>
                        <CardBody className="flex flex-col items-center text-center h-48">
                            <h1 className="text-xl text-black">{profesional.name}</h1>
                            <h2 className="text-md font-semibold text-deep-purple-300">{profesional.title}</h2>
                            <p className="text-blue-gray text-xs">
                                {profesional.description}
                            </p>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {/* Tercera fila: 3 cards */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                {profesionalesData.slice(5).map((profesional, index) => (
                    <Card key={index + 5} className="flex items-center justify-center w-96 border border-gray-300">
                        <CardHeader floated={false} className="h-56">
                            <img
                                src={profesional.img}
                                alt={`profesional${index + 6}`}
                                className="h-48 w-48 rounded-full object-cover"
                            />
                        </CardHeader>
                        <CardBody className="flex flex-col items-center text-center h-48">
                            <h1 className="text-xl text-black">{profesional.name}</h1>
                            <h2 className="text-md font-semibold text-deep-purple-300">{profesional.title}</h2>
                            <p className="text-blue-gray text-xs">
                                {profesional.description}
                            </p>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}
