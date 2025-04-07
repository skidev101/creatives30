export default function Features() {
  const features = [
    {
      title: "Challenge Overview",
      icon: "👩‍💻", 
      content: [
         "The challenge spans thirty days, during which participants are expected to create and submit a diverse range of projects. These projects can include websites, web pages, coding tools, or any other relevant coding endeavor. The primary goal is to encourage consistent coding practice and innovation."
      ]
        },
    {
      title: "Submission Platform  ",
      icon: "📝", 
      content: [
         "Participants will use the dedicated submission platform to upload their daily projects. This platform serves as a centralized hub for showcasing participants' work, allowing for easy navigation and exploration. Each submission will be tagged with relevant information, such as project type, coding language, and date."
      ]
        },
    
    {
      title: "Rating system ",
      icon: "⭐", 
      content: [
         'Admins, representing the organizing body of the challenge, will play a crucial role in evaluating and rating the submitted projects. The rating criteria include factors such as creativity, functionality, code quality, and adherence to the daily theme or challenge prompt. Admins will provide constructive feedback to participants, fostering a learning environment.'
      ]
        },

    {
      title: "Participant Interaction",
      icon: "🧠", 
      content: [
         "  The challenge promotes a sense of community by enabling participants to view and rate each other's projects. This interaction enhances the learning experience, as participants can draw inspiration from their peers, exchange ideas, and celebrate achievements. The submission platform facilitates seamless communication among participants."
      ]
    },
    {
      title: "Daily Theme",
      icon: "🎨", 
      content: [
        "To add an extra layer of creativity and structure, each day of the challenge will feature a thematic prompt or focus. This can range from specific coding techniques to broader project themes.",
        "Participants are encouraged to incorporate these themes into their daily projects, adding an element of diversity to the overall challenge."
      ]
    },
    {
      title: "Documentation Submission",
      icon: "⚡", 
      content: [
        "In addition to the daily project submissions, participants are required to submit a concise documentation file accompanying each project.",
        "This documentation should provide insights into the project’s purpose, key features, and any notable challenges or learning experiences encountered during development."
      ]
    },
    {
      title: "Conclusion",
      icon: "📧", 
      content: [
        'The "30 Days of Code with VickyJay" challenge is an exciting opportunity for programmers to enhance their skills, build a portfolio of diverse projects, and connect with a vibrant coding community. This documentation outlines the essential aspects of the challenge, ensuring a smooth and enriching experience for both participants and admins.'
      ]
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4 pb-10 font-grotesk">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
    {features.map((feature, index) => (
      <div
        key={index}
        className="bg-[#fcf7f8] px-8 py-10 border-2 border-blue-400 hover:bg-opacity-75 transition-all duration-300 max-w-[390px] md:max-w-[652px] lg:h-[380px] flex flex-col items-start rounded-md"
      >
        <h4 
          className="text-[18px] pb-2 capitalize leading-[22.16px] font-medium md:text-[20px] md:leading-[28px] flex items-center"
        >
          <span className="mr-2">{feature.icon}</span>
          {feature.title}
        </h4>
        {feature.content.map((paragraph, idx) => (
          <p key={idx} className="text-gray-900 text-[12px] leading-[20.963px] font-medium md:text-[15px] md:leading-[25px] max-w-[353px] lg:max-w-[590px]">
            {paragraph}
          </p>
        ))}
      </div>
    ))}
  </div>
</div>
  );
}