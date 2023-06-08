using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using Application.Interfaces;

namespace API.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("MyConnectionString"));
            });
            
            services.AddCors(opt => {
                opt.AddPolicy("MyCorsPolicy", policy => {
                   policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000"); 
                });
            });

            services.AddMediatR(typeof(List.Handler));
            services.AddAutoMapper(typeof(MappingProfile).Assembly);
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>(); // Contains at least ONE that inherits from "AbstractValidator"
            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor, UserAccessor>();  // Inject Service in ALL Handlers
            
            return services;
        }
    }
}
