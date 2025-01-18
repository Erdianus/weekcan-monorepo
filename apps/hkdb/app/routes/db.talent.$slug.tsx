import { json, LoaderFunctionArgs } from '@remix-run/node';
import { MetaFunction, useLoaderData, useNavigate } from '@remix-run/react';
import { Card, CardBody, CardHeader, Spinner, Chip } from '@nextui-org/react';
import { k } from '~/api';
import { Skill } from '~/api/archive/skill/schema';
import { Calendar, Briefcase, GraduationCap, Phone } from 'lucide-react';

export async function loader({ params }: LoaderFunctionArgs) {
  return json({
    slug: params.slug,
  });
}

export const meta: MetaFunction = () => {
  return [{ title: 'Detail Talent!' }];
};

const formatDate = (dateString: string) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const SectionTitle = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div className="flex items-center gap-2 text-xl font-semibold text-primary">
    {icon}
    <h2>{title}</h2>
  </div>
);

const TimelineItem = ({ title, period, detail }: { title: string; period: string; detail: string }) => (
  <div className="relative pl-6 pb-6 last:pb-0">
    <div className="absolute left-0 top-0 h-full w-0.5 bg-primary"></div>
    <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-primary"></div>
    <h3 className="font-semibold text-lg">{title || '-'}</h3>
    <p className="text-sm text-gray-500">{period || '-'}</p>
    <p className="mt-2 text-gray-600">{detail || '-'}</p>
  </div>
);

export default function Page() {
  const navigate = useNavigate();

  const param = useLoaderData<typeof loader>();
  const { data: response, isLoading } = k.archive.talent!.show.useQuery({
    variables: {
      slug: param.slug!,
    }
  });


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  const talent = response?.data;


  if (talent!) {
    navigate("/not-found");
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-5xl">
      {/* Profile Header */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardBody className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-3 text-primary">{talent!.name}</h1>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-4">
              {talent!.category_name && (
                <Chip color="primary" variant="shadow">
                  {talent!.category_name}
                </Chip>
              )}
              {talent!.birth_date && (
                <Chip variant="flat" startContent={<Calendar size={16} />}>
                  {formatDate(talent!.birth_date)}
                </Chip>
              )}
            </div>
            <p className="text-gray-600 leading-relaxed">
              {talent!.about || '-'}
            </p>
          </div>
        </CardBody>
      </Card>

      {/* Skills Section */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="px-6 py-4">
          <SectionTitle icon={<Briefcase size={24} />} title="Keahlian" />
        </CardHeader>
        <CardBody className="px-6 py-4">
          {talent!.skill && talent!.skill.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {talent!.skill.map((skill: Skill) => (
                <Chip key={skill.id} variant="flat" className="text-sm">
                  {skill.name}
                </Chip>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">-</p>
          )}
        </CardBody>
      </Card>

      <div className='flex flex-row justify-center gap-6'>
        {/* Experience Section */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
          <CardHeader className="px-6 py-4">
            <SectionTitle icon={<Briefcase size={24} />} title="Pengalaman" />
          </CardHeader>
          <CardBody className="px-6 py-4">
            {talent!.experience && talent!.experience.length > 0 ? (
              <div className="space-y-6">
                {talent!.experience.map((exp: { id: number; title: string; from: string; to: string; detail: string }) => (
                  <TimelineItem
                    key={exp.id}
                    title={exp.title}
                    period={`${formatDate(exp.from)} - ${formatDate(exp.to)}`}
                    detail={exp.detail}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">-</p>
            )}
          </CardBody>
        </Card>

        {/* Education Section */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
          <CardHeader className="px-6 py-4">
            <SectionTitle icon={<GraduationCap size={24} />} title="Pendidikan" />
          </CardHeader>
          <CardBody className="px-6 py-4">
            {talent!.education && talent!.education.length > 0 ? (
              <div className="space-y-6">
                {talent!.education.map((edu: { id: number; title: string; from: string; to: string; detail: string }) => (
                  <TimelineItem
                    key={edu.id}
                    title={edu.title}
                    period={`${formatDate(edu.from)} - ${formatDate(edu.to)}`}
                    detail={edu.detail}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">-</p>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Contact Section */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="px-6 py-4">
          <SectionTitle icon={<Phone size={24} />} title="Kontak" />
        </CardHeader>
        <CardBody className="px-6 py-4">
          {talent!.contact && talent!.contact.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {talent!.contact.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center gap-3 p-3">
                  <span className="capitalize font-bold text-primary dark:text-gray-100">{contact.type}:</span>
                  <span className="text-gray-600 dark:text-gray-300">{contact.contacts || '-'}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">-</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}